<template>

  <view class='body'>
    <view class=' p-20 bg-white flex-row-center'>
      <image src='../../images/ic_hotel_detail.jpg' class='image'></image>

      <view class='flex-column m-l-20'>
        <text class='font-30 m-b-10'>{{order.hotel}}</text>
        <text class='font-30 m-b-10 text-summary'>房型：{{order.hotelroom}}</text>
        <text class='font-30 m-b-10 text-summary'>{{showStartTime}}-{{showEndTime}} 共{{order.days}}晚</text>
      </view>
    </view>
    <view class="flex-column bg-white p-20" style="border-radius: 10rpx ">
      <view class="flex-row font-24 text-summary p-20" style="justify-content: space-around" @tap="toSelectDate">
        <text>入住日期</text>
        <text>住{{order.days}}晚</text>
        <text>离店日期</text>
      </view>
      <view class="flex-row font-32 " style="justify-content: space-around" @tap="toSelectDate">
        <text>{{showStartTime}}</text>
        <text class="text-summary">|</text>
        <text>{{showEndTime}}</text>
      </view>
    </view>
    <view class='p-20 border-bottom bg-white ' style="margin-top: 20rpx">
      <picker bindchange="bindPickerChange" value="{{index}}" range="{{array}}">
        <view class="picker font-30">
          房间数：{{order.roomnumber}}
        </view>
      </picker>
    </view>

    <view class='p-20 border-bottom bg-white'>
      <text class='font-30'>入住人:</text>
      <text class='m-l-20 font-30 text-summary'>{{order.people}}</text>
    </view>
    <view class='p-20 border-bottom bg-white'>
      <text class='font-30'>手机号:</text>
      <text class='m-l-20 font-30 text-summary'>{{order.phone}}</text>
    </view>
  </view>
  <view class='buttom flex-row-center' style="justify-content: space-between;">
    <text class='text-white m-l-20 font-32'>合计：{{order.price}}</text>
    <view class='flex-row'>
      <view class='flex-row-center' >
        <text class='text-white font-28'>查看明细</text>
      </view>
      <text class='reserve font-36 m-l-20' @tap="sendOrder">立即预定</text>
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy'
  import httpUtil from '../../common/js/httputil'
  let app =null;
  export default class Reserve extends wepy.page{
    config={
      navigationBarTitleText:"预订"
    };
    data={
      room:null,
      userInfo:null,
      showStartTime: "--月--日",
      showEndTime: "--月--日",
      startTime: "--月--日",
      endTime: "--月--日",
      array:[1,2,3,4,5],
      index:0,
      order:{
        hotel:'',
        userid:0,
        hotelroom:'',
        roomnumber:1,
        people:'',
        phone:'',
        note:'',
        price:0.00,
        startdate:'',
        enddate:'',
        ordernumber:'',
        status:0,
        days:1
      }
    };
    methods={
      bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.index = e.detail.value;
        this.order.roomnumber=this.array[this.index];
        this.countPrice();
      },
      toSelectDate() {
        app.navigateTo('../date/selectDate?startTime=' + this.startTime + '&endTime=' + this.endTime + "&page=5");
      },
    };
    countPrice(){
      this.order.price = (this.order.days*this.order.roomnumber*(this.room.price*100))/100;
    }

    sendOrder(){
      const order = this.order;
      if(order.phone == null){
        app.showToast("请先绑定手机号再预订");
        app.navigateTo("../login");
        return;
      }
      const data = new Date();
      order.ordernumber = app.formatDate(data)+data.getTime();
      const requestHandle ={
        url:app.globalData.host+"order/wxPrePay",
        data:order,
      };
       httpUtil.post(requestHandle)
         .then(result=>{
           wx.requestPayment({
             timeStamp: result.timeStamap,
             nonceStr: result.nonceStr,
             package: result.packageStr,
             signType: 'MD5',
             paySign: result.paySign,
             success(res) {
               console.log(res)
             },
             fail(res) {
               console.log(res)
             }
           })
         },eroor=>{
           console.log(eroor);
         })
    }

    uploadSelectDate(startTime, endTime) {
      this.startTime = startTime;
      this.endTime = endTime;
      this.showStartTime = app.formatDateForMandD(startTime);
      this.showEndTime = app.formatDateForMandD(endTime);
      this.order.days = app.getSelectDay(startTime, endTime);

      this.countPrice();
    }
    onLoad(option){
      app =  this.$parent;
      this.room = app.globalData.room;
      this.userInfo = app.globalData.userInfo;
      this.order.hotel=app.globalData.hotel.hotelname;
      this.order.hotelroom = this.room.name;
      this.order.startdate =option.startTime;
      this.order.enddate = option.endTime;
      this.order.price = this.room.price;
      this.order.people=this.userInfo.nickname;
      this.order.phone = this.userInfo.phone;
      this.order.userid = this.userInfo.id;
      this.order.roomnumber = 1;
      this.uploadSelectDate(option.startTime, option.endTime);
      console.log(this.order)
    }
  };
</script>
<style src="../../common/css/reserve.css"></style>
<style src="../../common/css/common.css"></style>
