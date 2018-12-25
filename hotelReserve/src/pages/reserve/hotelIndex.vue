<template>
  <view class='root'>
    <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
      <repeat for="{{movies}}" key="{{this}}">
        <swiper-item>
          <image src="{{item.url}}" class="slide-image" mode="aspectFill"/>
        </swiper-item>
      </repeat>
    </swiper>
    <!-- <image class='head_img' mode='widthFix' src='{{head_img_url}}'></image> -->
    <!--<view class='select_date'>-->
      <!--<image src='../../images/icon_date.png' class='icon'></image>-->
      <!--<view class='flex-column'>-->
        <!--<text class='font-26'>入住</text>-->
        <!--<view class='flex-row-center'>-->
          <!--<text class='font-50'>9</text>-->
          <!--<view class='flex-column font-24 m-l-20'>-->
            <!--<text>周日</text>-->
            <!--<text>11月</text>-->
          <!--</view>-->
        <!--</view>-->
      <!--</view>-->

      <!--<text class='select_day bg-king'>共1晚</text>-->
      <!--<view class='flex-column'>-->
        <!--<text class='font-26'>离店</text>-->
        <!--<view class='flex-row-center'>-->
          <!--<text class='font-50'>9</text>-->
          <!--<view class='flex-column font-24 m-l-20'>-->
            <!--<text>周日</text>-->
            <!--<text>11月</text>-->
          <!--</view>-->
        <!--</view>-->
      <!--</view>-->
    <!--</view>-->

    <view class="flex-column m-30 bg-default p-40" style="border-radius: 10rpx ">
       <view class="flex-row font-24 text-summary p-20" style="justify-content: space-around">
         <text >入住日期</text>
         <text>住一晚</text>
         <text>离店日期</text>
       </view>
      <view class="flex-row font-32 " style="justify-content: space-around">
        <text>12月25日</text>
        <text class="text-summary">|</text>
        <text>12月30日</text>
      </view>
    </view>

    <view class='btn_serch font-36' bindtap='toHotelList'>查找酒店</view>
  </view>
</template>

<script>
  import wepy from 'wepy'
  import httpUtil from '../../common/js/httputil'

  let app = null;
  export default class HotelIndex extends wepy.page {
    data = {
      head_img_url:'../../images/img_head.jpg',
      movies: [
        { url: '../../images/img_head.jpg' },
        { url: '../../images/img_head.jpg' },
        { url: '../../images/img_head.jpg' },
        { url: '../../images/img_head.jpg' }
      ]
    };

    methods = {
       toHotelList(){
         app.navigateTo('hotelList');
       }
    };

    onLoad() {
      app = this.$parent;
    }
  };
</script>
<style src="../../common/css/hotelIndex.css"></style>
<style src="../../common/css/common.css"></style>
