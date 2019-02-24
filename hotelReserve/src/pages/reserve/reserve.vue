<style src="../../common/css/modal.css"></style>
<template>
  <view class='body'>
    <view class=' p-20 bg-white flex-row-center border-bottom'>
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
      <text class='m-l-20 font-30 text-summary'>{{userInfo.nickname}}</text>
    </view>
    <view class='p-20 border-bottom bg-white'>
      <text class='font-30'>手机号:</text>
      <text class='m-l-20 font-30 text-summary'>{{userInfo.phone}}</text>
    </view>

    <view class="flex-column p-20 font-30 text-summary" >
      <text>提示：</text>
      <text>1、携带所有入住人的有效身份证件办理入住，入住必须按照一人一证</text>
      <text>2、请在14:00至23:59内入住并于次日12:00之前退房；如需提前入住或延时退房，请咨询商家”</text>
    </view>
  </view>



  <!-- 查看明细 -->
  <view hidden="{{!showRecordModal}}">
    <view class="modal-mask" bindtap="hideModal" catchtouchmove="preventTouchMove"></view>
    <view class="modal-dialog" style="top: 30%;">
      <view class="modal-title border-bottom">价格明细</view>
      <view class="modal-content flex-row-center" style="justify-content: space-between;">
        <view class="font-28">房费</view>
        <view class="font-28 text-king">￥{{order.price}}</view>
      </view>
      <view class="flex-row-center modal-content" style="justify-content: space-between;">
        <view class="font-30">总价</view>
        <view class="font-32 text-king">￥{{order.price}}</view>
      </view>
    </view>
  </view>

  <view class='buttom flex-row-center' style="justify-content: space-between;">
    <text class='text-white m-l-20 font-32'>合计：{{order.price}}</text>
    <view class='flex-row'>
      <view class='flex-row-center' >
        <text class='text-white font-28' @tap="showRecord">查看明细</text>
      </view>
      <text class='reserve font-36 m-l-20' @tap="sendOrder">立即预定</text>
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy'
  import httpUtil from '../../common/js/httputil'
  import util from '../../common/js/utils'
  import NoFind from '../../components/common/noFind'
  let app =null;
  export default class Reserve extends wepy.page{
    config={
      navigationBarTitleText:"预订"
    };

    components={

    };
    data={
      showRecordModal:false,
      type:0,
      room:null,
      userInfo:null,
      showStartTime: "--月--日",
      showEndTime: "--月--日",
      startTime: "--月--日",
      endTime: "--月--日",
      array:[1,2,3,4,5],
      index:0,
      order:{
        hotelid:0,
        roomid:0,
        userid:0,
        roomnumber:1,
        note:'',
        price:0.00,
        startdate:'',
        enddate:'',
        ordernumber:'',
        days:1
      }
    };
    methods={
      showRecord(){
        this.showRecordModal = true;
      },
      hideModal(){
        this.showRecordModal = false;
      },
      bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.index = e.detail.value;
        this.order.roomnumber=this.array[this.index];
        this.countPrice();
      },
      toSelectDate() {
        let page ;
        if(this.type==0){
          page = 5;
        }else{
          page = 2;
        }
        app.navigateTo('../date/selectDate?startTime=' + this.startTime + '&endTime=' + this.endTime + "&page="+page);
      },
    };
    countPrice(){
      this.order.price = (this.order.days*this.order.roomnumber*(this.room.price*100))/100;
    }

    sendOrder(){
      const order = this.order;
      const data = new Date();
      order.ordernumber = app.formatDate(data)+data.getTime();
      const requestHandle ={
        url:app.globalData.host+"order/wxPrePay",
        data:order,
      };
       httpUtil.post(requestHandle,"生成订单中...")
         .then(result=>{
           wx.requestPayment({
             timeStamp: result.preOrder.timestamap,
             nonceStr: result.preOrder.noncestr,
             package: result.preOrder.packagestr,
             signType: 'MD5',
             paySign: result.preOrder.paysign,
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
      this.type=option.type;
      if(this.type==0){
        this.order.startdate =option.startTime;
        this.order.enddate = option.endTime;
      }else{
        const date = new Date();
        this.order.startdate =util.formatDate(date);
        date.setTime(date.getTime()+3600*1000*24);
        this.order.enddate = util.formatDate(date);
      }
      app =  this.$parent;
      this.room = app.globalData.room;
      this.userInfo = app.globalData.userInfo;
      this.order.hotelid=app.globalData.hotel.id;
      this.order.roomid = this.room.id;
      this.order.hotelroom = this.room.name;
      this.order.price = this.room.price;
      this.order.userid = this.userInfo.id;
      this.order.roomnumber = 1;
      console.log(this.order)
      this.uploadSelectDate(this.order.startdate, this.order.enddate);

    }
  };
</script>
<style src="../../common/css/reserve.css"></style>
<style src="../../common/css/common.css"></style>
