<!-- 启动界面，判断要跳转到什么界面 -->
<style>
  .userinfo-avatar {
    width: 128rpx;
    height: 128rpx;
    margin: 20rpx;
    border-radius: 50%;
  }

</style>
<template>
  <view class="p-40">

    <view class="text-center">
      <image class="userinfo-avatar" src="../images/icon.jpg" background-size="cover"></image>
    </view>

    <view class="m-t-20 text-center" >
      <text style="justify-content: center;font-size: 24px">欢迎使用四季星酒店预订</text>
    </view>

    <block wx:if="{{needAuthorization}}">
      <view style="margin-top: 32rpx">
        <text style="font-size: 16px">授权提醒</text>
      </view>

      <view>
        <text style="font-size: 14px">为了方便您更好的体验四季星酒店，我们将获取您的基本用户信息，请点击授权</text>
      </view>
      <button type="primary" style="margin-top: 32px" open-type="getUserInfo"
              bindgetuserinfo="onGotUserInfo">确认授权
      </button>
    </block>

  </view>
</template>


<script>
  // import Base from 'base';
  import wepy from 'wepy'
   import httpUtil  from '../common/js/httputil'
  let app = null;

  export default class Authorization extends wepy.page {
    data = {
      needAuthorization: false,
      loginData: {
        code: '',
        iv: '',
        encryptedData: ''
      },
      userInfo: null
    };
    methods = {
      //微信授权
      onGotUserInfo(res) {
        console.log('微信授权回调');
        console.log(res);
        if (res.detail.errMsg === 'getUserInfo:ok') {
          //获取用户信息成功
          //请求一次wx登录
          this.wxLogin();
        }
      }
    };

    redirectTo(url) {
      //延迟跳转
      let timer1 = setTimeout(function() {
        //循环代码
        wx.hideLoading();
        //关闭当前页面，跳转到指定页面
        wx.redirectTo({
          url: url
        });
      }, 1000);
    }

    //判断是否登录
    isLogin() {
      console.log('isLogin');
      this.userInfo = app.userInfo();
      try {
        if (this.userInfo != null) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    }

    //显示授权界面
    showAuthorization() {
      console.log('showAuthorization');
      // this.hideLoading();
      app.hideLoading();
      this.needAuthorization = true;
      this.$apply();
    }

    //执行微信登录，获取code
    wxLogin() {
      console.log('wxLogin');
      app.showLoading('获取用户信息...');
      const that = this;
      wx.login({
        success(res) {
          console.log(res);
          that.loginData.code = res.code;
          //第一步：拿Code
          //第二步：去获取微信的用户敏感数据，顺序不能变
          wx.getUserInfo({
            success(res2) {
              console.log(res2);
              that.loginData.encryptedData = res2.encryptedData;
              that.loginData.iv = res2.iv;
              that.requestWxLogin();
            },
            fail(res2) {
              console.log(res2);
            }
          });
        },
        fail(err) {
          that.hideLoading();
          console.log(err);
        }
      });
    }
    //向微信拿取用户信息，来判断是否授权过
    wxGetUserInfo() {
      console.log('wxGetUserInfo');
      const that = this;
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success(res2) {
                console.log(res2);
                that.wxLogin();
              },
              fail(res2) {
                console.log(res2);
                // app.hideLoading();
                //拿不到微信的用户信息，说明还没有授权
                that.showAuthorization();
              }
            });
          }else{
            that.showAuthorization()
          }
        },
        error(){
          app.hideLoading();
        }

      });

    }

    //向我们服务器请求微信登录以获取用户信息
    requestWxLogin() {
      console.log('requestWxLogin');
      const that = this;
      const requestHanlder ={
        url:app.globalData.host+"user/add",
        data:JSON.stringify(this.loginData),
      };
      httpUtil.post(requestHanlder,true,"获取用户信息...")
        .then(result=>{
          console.log(result);
          app.globalData.userInfo = result.user;
          that.userInfo = result.user;
          // //跳转到
          const phone = that.userInfo.phone;
          console.log(phone);
          // //已经授权过  判断手机号是否为空
          // //如果不为空，说明还没有进行手机号码绑定
          // if (phone) {
              //开始时候定位的页面
              wx.switchTab({
                url: 'reserve/hotelIndex'
              });
          // } else {
          //   that.redirectTo('login');
          // }
        },error=>{
          that.showAuthorization();
          console.log(error);
        })
    }


    onLoad() {
      app = this.$parent;
      app.showLoading('启动中...');
      //判断是否登录
      let login = this.isLogin();
      const that = this;
      if (login) {
        //已经登录,获取用户信息
        let userInfo = that.userInfo;
        app.globalData.userInfo = userInfo;
        app.globalData.token = userInfo.token;
        const phone = userInfo.phone;
        console.log(phone);
        //已经授权过  判断手机号是否为空
        //如果不为空，说明还没有进行手机号码绑定
        // if (phone) {
          //Todo 进入预订界面
          wx.switchTab({
            url: 'reserve/hotelIndex'
          });
        // } else {
        //   that.redirectTo('login');
        // }
      } else {
        that.wxGetUserInfo();
      }
    }
  };
</script>

