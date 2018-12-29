<template>

  <view class='body'>
    <view class=' p-20 bg-white flex-row-center'>
      <image src='../../images/ic_hotel_detail.jpg' class='image'></image>

      <view class='flex-column m-l-20'>
        <text class='font-30 m-b-10'>{{hotelName}}</text>
        <text class='font-30 m-b-10 text-summary'>房型：{{room.name}}</text>
        <text class='font-30 m-b-10 text-summary'>{{showStartTime}}-{{showEndTime}} 共{{selectDays}}晚</text>
      </view>
    </view>
    <view class='p-20 border-bottom bg-white ' style="margin-top: 20rpx">
      <picker bindchange="bindPickerChange" value="{{index}}" range="{{array}}">
        <view class="picker font-30">
          房间数：{{array[index]}}
        </view>
      </picker>
    </view>

    <view class='p-20 border-bottom bg-white'>
      <text class='font-30'>入住人:</text>
      <text class='m-l-20 font-30 text-summary'>{{userInfo.nickname}}</text>
    </view>
    <view class='p-20 border-bottom bg-white'>
      <text class='font-30'>手机号:</text>
      <text class='m-l-20 font-30 text-summary'>{{userInfo.phone}}</text>
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
  import wepy from 'wepy'
  import httpUtil from '../../common/js/httputil'
  let app =null;
  export default class Reserve extends wepy.page{
    data={
      hotelName:'',
      room:null,
      userInfo:null,
      showStartTime: "--月--日",
      showEndTime: "--月--日",
      startTime: "--月--日",
      endTime: "--月--日",
      selectDays: 1,
      roomNum:1,
      array:[1,2,3,4,5],
      index:0,
      order:{
        hotel:'',
        hotelroom:'',
        roomnumbeer:1,
        people:'',
        note:'',
        price:0.00,
        startTime:'',
        endTime:'',
        orderNumber:''
      }
    };
    methods={
      bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.index = e.detail.value;
      },
    };

    uploadSelectDate(startTime, endTime) {
      this.startTime = startTime;
      this.endTime = endTime;
      this.showStartTime = app.formatDateForMandD(startTime);
      this.showEndTime = app.formatDateForMandD(endTime);
      this.selectDays = app.getSelectDay(startTime, endTime);
    }
    onLoad(option){
      app =  this.$parent;
      this.hotelName = app.globalData.hotel.hotelName;
      this.room = app.globalData.room;
      this.userInfo = app.globalData.userInfo;
      this.uploadSelectDate(option.startTime, option.endTime);
    }
  };
</script>
<style src="../../common/css/reserve.css"></style>
<style src="../../common/css/common.css"></style>
