<template>
  <view>
    <view class='head_box'>
      <view class='service_item'>
        <image class='head_img' src={{userInfo.avatarurl}}'></image>
        <text class='font-30 text-white m-t-10'>{{userInfo.nickname}}</text>
      </view>
    </view>

    <view class="flex-column m-20 " style="margin-top: -30rpx" >
    <view class="flex-row-center bg-white p-20"  style="border-radius: 10rpx">
      <image class="icon-50" src="../../images/ic_phone.svg"></image>
      <text class="font-30 text-content m-l-20">{{userInfo.phone==null||userInfo.phone==""?"请绑定手机号":userInfo.phone}}</text>
      <view class="update-btn" @tap="toBindPhone" >{{userInfo.phone==null||userInfo.phone==""?"绑定手机号":"修改手机号"}}</view>
    </view>
    <view class="flex-column bg-white m-t-20" style="border-radius: 10rpx;" >
      <view class="flex-row-center p-20 border-bottom" @tap="toOrder">
        <image class="icon-50" src="../../images/ic_order.svg"></image>
        <text class="font-30 text-content m-l-20">我的订单</text>
      </view>
      <view class="flex-row-center p-20 border-bottom">
        <image class="icon-50" src="../../images/ic_yhq.svg"></image>
        <text class=" font-30 text-content m-l-20">我的优惠券</text>
      </view>
    </view>
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy'
  import httpUtil from '../../common/js/httputil'

  let app = null;
  export default class My extends wepy.page {
    config={
      navigationBarTitleText:"我的"
    };
    data = {
      userInfo: null,
    };
    methods = {
      toOrder(){
        app.navigateTo("myOrder")
      },
      toBindPhone(){
        let title;
        if(this.userInfo.phone==""||this.userInfo.phone==null){
          title = "绑定手机号";
        }else{
          title = "修改手机号";
        }
        app.navigateTo("../login?title="+title);
      }
    };
    updateUserInfo(){
      this.userInfo = app.globalData.userInfo;
    }

    onLoad() {
      app = this.$parent;
      this.userInfo = app.userInfo();
    }
  };
</script>

<style src="../../common/css/my.css"></style>
<style src="../../common/css/common.css"></style>
