<template>
  <view>
    <view class='head_box'>
      <view class='service_item'>
        <image class='head_img' src={{userInfo.avatarurl}}'></image>
        <text class='font-30 text-white m-t-10'>{{userInfo.nickname}}</text>
      </view>
    </view>

    <view class="flex-column m-20 bg-white" style="border-radius: 10rpx;margin-top: -40rpx">
      <view class="flex-row-center p-20 border-bottom">
        <image class="icon-40" src="../../images/ic_user_defaut.png"></image>
        <text class="font-30 text-content m-l-20">我的订单</text>
      </view>
      <view class="flex-row-center p-20 border-bottom">
        <image class="icon-40" src="../../images/ic_user_defaut.png"></image>
        <text class=" font-30 text-content m-l-20">我的优惠券</text>
      </view>
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy'
  import httpUtil from '../../common/js/httputil'

  let app = null;
  export default class My extends wepy.page {
    data = {
      userInfo: null,

    };
    methods = {};

    onLoad() {
      app = this.$parent;
      this.userInfo = app.userInfo();
    }
  };
</script>

<style src="../../common/css/my.css"></style>
<style src="../../common/css/common.css"></style>
