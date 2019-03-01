<template>
  <view class='root'>
    <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
      <repeat for="{{movies}}" key="{{this}}">
        <swiper-item>
          <image src="{{item.url}}" mode="aspectFill"/>
        </swiper-item>
      </repeat>
    </swiper>
    <!--<swiper class="bannerBox" autoplay="true" interval="3000" duration="500" previous-margin="50rpx" next-margin="50rpx" @change="bannerChange">-->
      <!--<repeat wx:for="{{movies}}" key="{{this}}">-->
        <!--<swiper-item>-->
          <!--&lt;!&ndash;<div class="fix pl5 pr5 box_bb">&ndash;&gt;-->
              <!--<image class="banner mt10" src="{{item.url}}" mode="aspectFill" />-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--</swiper-item>-->
      <!--</repeat>-->
    <!--</swiper>-->
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
        { url: '../../images/ic_head_04.jpg' },
        { url: '../../images/ic_head_02.jpg' },
        { url: '../../images/ic_head_03.jpg' }
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
<style scoped>
  .bannerBox{
    height: 208px;
  }
  .banner{
    overflow: hidden;
    height: 168px;
    transition: transform 500ms;
    transform: scale(0.95,0.9);  /* 因为非主图看不清，所以可以变形处理 */
    border-radius: 8px;
    box-shadow: 0px 6px 10px 0px rgba(179,154,139,1);
  }
  .banner.active{
    transform: scale(1,1);
  }
  .bannerDots{
    width: 100%;
    left: 0;
    bottom: 40px;
    height: 6px;
  }
  .dot{
    width: 6px;
    height: 6px;
    margin: 0 3px;
    border-radius: 3px;
    background-color: #fff;
  }
  .dot.active{
    width: 15px;
    background-color: #7090E8;
  }
</style>
<style src="../../common/css/hotelIndex.css"></style>
