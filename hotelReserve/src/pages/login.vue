<style src='../../dist/components/sye/style.min.css'></style>
<style lang="less">
  .logo_parent_view {
    height: 60px;
    width: 100%;
    text-align: center;
  }

  .logo_img {
    width: 60px;
    height: 60px;
    border-radius: 70%;
  }

  .input_style {
    border-color: #cecece;
    border-width: 1px;
    border-style: solid;
    height: 35px;
    font-size: 14px;
  }

  input[placeholder] {
    font-size: 14px;
    text-align: left;
    padding-left: 15px;
  }

  .margin10_v {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 5%;
    margin-right: 5%;
  }

  .login_view {
    width: 90%;
    margin-top: 20%;
    margin-left: 5%;
    /*padding-top: 20px;*/
    /*padding-bottom: 20px;*/
  }

  .code_input {
    width: 60%;
  }

  .code_view {
    display: flex;
    flex-direction: row;
    margin-left: 5%;
    margin-right: 5%;
  }

  .code_btn {
    font-size: 14px;
    height: 35px;
    width: 35%;
    padding: 2px;
    text-align: center;
    margin-left: 10px;
    background: #4798e8;
    color: white;
    font-weight: 300;
  }

  .login_btn {
    font-size: 14px;
    margin-right: 5%;
    margin-left: 5%;
    background: #4798e8;
    margin-top: 30px;
    color: white;
    height: 35px;
    font-weight: 300;
  }
</style>
<template>
  <view>
    <view class="login_view">
      <view class="logo_parent_view">
        <image class="logo_img" src="../images/icon.jpg"/>
      </view>
      <input type="number" class="input_style margin10_v" bindinput="bindPhoneInput" placeholder="请输入手机号"/>
      <view class="code_view">
        <input class="input_style code_input" bindinput="bindCodeInput" type="number" placeholder="请输入验证码"/>
        <button class="code_btn" disabled="{{!codeBtnEnable}}" @tap='getCode'>
          {{code_tv}}
        </button>
      </view>
      <button class="login_btn" @tap="bindPhone">
        绑定
      </button>
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import httpUtil from '../common/js/httputil'

  let app;
  export default class Login extends wepy.page {
    config={
      navigationBarTitleText:"绑定手机号"
    };
    data = {
      phone: '',
      codeInput: '',
      timer: null,
      code_tv: "获取验证码",
      bindUrl: "https://school.delightmom.com/user/user/phone/bind",
      verifycodeUrl: "https://school.delightmom.com/user/verifycode",
      userInfo: null,
      codeBtnEnable: true,
      verifyCode: "",
      codeTime: new Date().getTime()
    };
    methods = {
      bindPhoneInput(e) {
        this.phone = e.detail.value;
      }, bindCodeInput(e) {
        this.codeInput = e.detail.value;
      },

      bindPhone() {
        let that = this;
        if (that.phone === "") {
          // console.log("手机号不能为空");
          app.showToast("手机号不能为空");
          return
        }
        if (!(/^1[34578]\d{9}$/.test(this.phone))) {
          app.showToast("请输入正确的手机号码");
          return;
        }
        if (that.codeInput === "") {
          app.showToast("验证码不能为空");
          return;
        }
        if (that.codeInput.length !== 6) {
          app.showToast("验证码格式不正确");
          return;
        }
        if(that.codeInput!=that.verifyCode){
          app.showToast("验证码错误");
        }
        if(that.codeTimeOut()){
          app.showToast("验证码超时");
          return;
        }
        const requestHandle = {
          url: app.globalData.host + "user/bindPhone",
          data: {
            id: that.userInfo.id,
            phone: that.phone,
          }
        };
        httpUtil.post(requestHandle)
          .then(result => {
            app.showToast("绑定手机号成功");
            app.globalData.userInfo = result.user;
            app.back();
            app.getPrePage().updataUserInfo();
            console.log(result);
          }, error => {
            console.log(error);
          });
      },

      getCode() {
        let that = this;
        if (that.phone === "") {
          console.log("手机号不能为空");
          app.showToast("手机号码不能为空");
          return
        }

        if (!(/^1[34578]\d{9}$/.test(this.phone))) {
          app.showToast("请输入正确的手机号码");
          return;
        }
        that.codeBtnEnable = false;
        that.verifyCode = that.getVerifyCode();
        that.setTime();
        console.log(that.verifyCode);
        that.$apply();
        const requestHander = {
          url: app.globalData.host + "user/sendVerifyCode?phone=" + that.phone + "&code=" + that.verifyCode,
        };
        // httpUtil.post(requestHander)
        //   .then(result => {
        //     console.log(result);
        //     that.codeTime = new Date().getTime();
        //   }, error => {
        //     that.codeBtnEnable = true;
        //     that.onUnload();
        //     console.log(error);
        //   });
      },
    };

    getVerifyCode() {
      let verifyCode = "";
      for (let i = 0; i < 6; i++) {
        const num = parseInt(Math.random() * 9, 10).toString()
        verifyCode = verifyCode + num;
      }
      return verifyCode;
    }

    codeTimeOut(){
      const nowTime = new Date().getTime();
      if(nowTime-this.codeTime>1000*60*5){
        return true;
      }else{
        return false;
      }
    }

    setTime() {
      if (this.code_tv !== "获取验证码") {
        return
      }
      var number = 60;
      this.code_tv = number.toString() + 's';
      let that = this;
      this.timer = setInterval(function() {
        // console.log("start")
        number--;
        if (number === 0) {
          that.code_tv = "获取验证码";
          that.codeBtnEnable = true;
          that.$apply();
          clearInterval(that.timer)
          return
        }
        that.code_tv = number.toString() + 's'
        that.$apply();
        // console.log(that.code_tv)
      }, 1000)
    }

    onLoad() {
      app = this.$parent;
      this.userInfo = app.userInfo();
    }

    onUnload() {
      if (this.timer != null) {
        const that = this;
        //清除计时器  即清除setInter
        clearInterval(that.timer)
      }
    }
  }


</script>

<style scoped>

</style>
