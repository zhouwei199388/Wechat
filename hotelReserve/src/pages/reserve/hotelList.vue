<template>
  <view class="root">
    <view class="flex-column m-30 bg-white p-20" style="border-radius: 10rpx ">
      <view class="flex-row font-24 text-summary p-20" style="justify-content: space-around" @tap="toSelectDate">
        <text>入住日期</text>
        <text>住{{selectDays}}晚</text>
        <text>离店日期</text>
      </view>
      <view class="flex-row font-32 " style="justify-content: space-around" @tap="toSelectDate">
        <text>{{showStartTime}}</text>
        <text class="text-summary">|</text>
        <text>{{showEndTime}}</text>
      </view>
    </view>
    <repeat for='{{hotelInfos}}'>
      <view class='item item-click' @tap='onItemClick({{index}},{{item.id}})'>
        <image class='item_img' src='{{item.hotelImages[0].url}}'></image>
        <view class='flex-row p-20' style="justify-content: space-between">
          <!--<view class='font-30'>{{item.hotelName}}</view>-->
          <view class='font-30 text-summary'>{{item.hoteladdress}}</view>
          <view class='font-30 text-king'>￥{{item.minprice}}起</view>
        </view>
      </view>
    </repeat>
  </view>

</template>

<script>
  import wepy from 'wepy'
  import httpUtil from '../../common/js/httputil'

  let app = null;
  export default class HotelList extends wepy.page {
    config={
      navigationBarTitleText:"酒店列表"
    };
    data = {
      hotelInfos: [],
      showStartTime: "--月--日",
      showEndTime: "--月--日",
      startTime: "--月--日",
      endTime: "--月--日",
      selectDays: 1,
    };
    methods = {
      onItemClick(index, id) {
        console.log(index);
        app.globalData.hotel = this.hotelInfos[index];
        app.navigateTo('hotelDetail?id=' + id+'&startTime=' + this.startTime + '&endTime=' + this.endTime)
      },
      toSelectDate() {
        app.navigateTo('../date/selectDate?startTime=' + this.startTime + '&endTime=' + this.endTime + "&page=3");
      }
    };

    uploadSelectDate(startTime, endTime) {
      this.startTime = startTime;
      this.endTime = endTime;
      this.showStartTime = app.formatDateForMandD(startTime);
      this.showEndTime = app.formatDateForMandD(endTime);
      this.selectDays = app.getSelectDay(startTime, endTime);
    }

    getHotelList() {
      const requestHandle = {
        url: app.globalData.host + 'hotelInfo/get',
      };

      httpUtil.get(requestHandle)
        .then(result => {
          this.hotelInfos = result.hotelModels;
          this.$apply();
          console.log(result);
        }, error => {
          console.log(error);
        })
    }

    onLoad(option) {
      app = this.$parent;
      this.uploadSelectDate(option.startTime, option.endTime);
      this.getHotelList();
    }
  }
</script>

<style src="../../common/css/hotelList.css"/>
