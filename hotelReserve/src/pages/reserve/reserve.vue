<template>

  <view class='body'>
    <view class=' p-20 bg-default flex-row-center'>
      <image src='../../images/ic_hotel_detail.jpg' class='image'></image>

      <view class='flex-column m-l-20'>
        <text class='font-30 m-b-10'>四季星酒店</text>
        <text class='font-30 m-b-10 text-summary'>房型：豪华大床房</text>
        <text class='font-30 m-b-10 text-summary'>11月15日-11月17日 共两晚</text>
      </view>
    </view>
    <view class='p-20 border-bottom bg-default ' style="margin-top: 20rpx">
      <text class='font-30'>房间数:</text>
    </view>

    <view class='p-20 border-bottom bg-default'>
      <text class='font-30'>入住人:</text>
      <text class='m-l-20 font-30 text-summary'>邹</text>
    </view>
    <view class='p-20 border-bottom bg-default'>
      <text class='font-30'>手机号:</text>
      <text class='m-l-20 font-30 text-summary'>15090824065</text>
    </view>
  </view>
  <view class='buttom flex-row-center' style="justify-content: space-between;">
    <text class='text-white m-l-20 font-32'>合计：228.00</text>
    <view class='flex-row'>
      <view class='flex-row-center' >
        <text class='text-white font-28'>查看明细</text>
      </view>
      <text class='reserve font-36 m-l-20'>立即预定</text>
    </view>
  </view>
</template>


<script>

  export default {
    name: 'reserve'
  };
</script>
<style src="../../common/css/reserve.css"></style>
<style src="../../common/css/common.css"></style>
