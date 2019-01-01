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
        hotelroom:'',
        roomnumber:1,
        people:'',
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
      wxPay(){
        timeStamp: new Date().getTime(),
          nonceStr: '',
          package: '',
          signType: 'MD5',
          paySign: '',
        wx.requestPayment({

          success(res) { },
          fail(res) { }
        })
      }
    };


    getNonce(){

    }

    countPrice(){
      this.order.price = this.order.days*this.order.roomnumber*this.order.price;
    }
    sendOrder(){
      const order = this.order;
      if(order.phone == null){
        app.showToast("请先绑定手机号再预订");
      }
      const data = new Date();
      order.ordernumber = app.formatDate(data)+data.getTime();
      const requestHandle ={
        url:app.globalData.host+"order/add",
        data:order,
      };
       httpUtil.post(requestHandle)
         .then(result=>{
           wx.showToast({
             title: '提交订单成功',
             icon: 'success',
             duration: 2000
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
      this.days = app.getSelectDay(startTime, endTime);
    }
    onLoad(option){
      app =  this.$parent;
      this.room = app.globalData.room;
      this.userInfo = app.globalData.userInfo;
      this.order.hotel=app.globalData.hotel.hotelName;
      this.order.hotelroom = this.room.name;
      this.order.startdate =option.startTime;
      this.order.enddate = option.endTime;
      this.order.price = this.room.price;
      this.order.people=this.userInfo.nickname;
      this.order.phone = this.userInfo.phone;
      this.order.roomnumber = 1;
      this.uploadSelectDate(option.startTime, option.endTime);
      console.log(this.order)
    }
  };
</script>
<style src="../../common/css/reserve.css"></style>
<style src="../../common/css/common.css"></style>
