<template>
  <view class='root'>
    <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
      <repeat for="{{movies}}" key="{{this}}">
        <swiper-item>
          <image src="{{item.url}}" class="slide-image" mode="aspectFill"/>
        </swiper-item>
      </repeat>
    </swiper>
    <view class="flex-column m-30 bg-default p-40" style="border-radius: 10rpx ">
       <view class="flex-row font-24 text-summary p-20" style="justify-content: space-around" @tap="toSelectDate">
         <text >入住日期</text>
         <text>住{{selectDays}}晚</text>
         <text>离店日期</text>
       </view>
      <view class="flex-row font-32 " style="justify-content: space-around" @tap="toSelectDate">
        <text>{{showStartTime}}</text>
        <text class="text-summary">|</text>
        <text>{{showEndTime}}</text>
      </view>
    </view>
    <button class='btn_search btn-king-click font-36' bindtap='toHotelList'>查找酒店</button>
  </view>
</template>

<script>
  import wepy from 'wepy'
  import httpUtil from '../../common/js/httputil'

  let app = null;
  export default class HotelIndex extends wepy.page {
    config={
      navigationBarTitleText:"四季星酒店预订"
    };
    data = {
      head_img_url:'../../images/img_head.jpg',
      movies: [
        { url: '../../images/img_head.jpg' },
        { url: '../../images/img_head.jpg' },
        { url: '../../images/img_head.jpg' },
        { url: '../../images/img_head.jpg' }
      ],
      showStartTime:"--月--日",
      showEndTime:"--月--日",
      startTime:"--月--日",
      endTime:"--月--日",
      selectDays:1,
    };

    methods = {
       toHotelList(){
         app.navigateTo('hotelList?startTime='+this.startTime+'&endTime='+this.endTime);
       },
       toSelectDate(){
         app.navigateTo('../date/selectDate?startTime='+this.startTime+'&endTime='+this.endTime+"&page=2");
       }
    };

    uploadSelectDate(startTime,endTime){
      this.startTime = startTime;
      this.endTime = endTime;
      this.showStartTime = app.formatDateForMandD(startTime);
      this.showEndTime = app.formatDateForMandD(endTime);
      this.selectDays = app.getSelectDay(startTime,endTime);
    }
    onLoad() {
      app = this.$parent;
      const date = new Date();
      const startTime = app.formatDate(date);
      date.setTime(date.getTime()+1000*60*60*24);
      const endTime = app.formatDate(date);
      this.uploadSelectDate(startTime,endTime);
      this.$apply();
    }
  };
</script>
<style src="../../common/css/hotelIndex.css"></style>
