<template>

  <view class="flex-row-center bg-white">
    <view class="{{status==-1?'tab-item-selected':'tab-item'}}" @tap="getOrder(-1)">全部</view>
    <view class="{{status==0?'tab-item-selected':'tab-item'}}" @tap="getOrder(0)">待支付</view>
    <view class="{{status==1?'tab-item-selected':'tab-item'}}" @tap="getOrder(1)">待入住</view>
    <view class="{{status==2?'tab-item-selected':'tab-item'}}" @tap="getOrder(3)">已取消</view>
  </view>

  <repeat for="{{orders}}">
    <view class="flex-column m-20 bg-white p-20" style="border-radius: 10rpx">
      <view class="flex-row-center border-bottom p-b-10" style="justify-content: space-between;">
        <view class="font-32 text-content">{{item.hotelInfo.hotelname}}</view>
        <view class="font-28 text-king">{{statusStr[item.status]}}</view>
      </view>
      <view class="font-28 text-summary m-t-10 ">
        房型:{{item.hotelroom.name}} {{item.roomnumber}}间
      </view>
      <view class="font-28 text-summary">
        入住:{{item.startdate}} 共{{item.days}}晚 离店:{{item.enddate}}
      </view>
      <view class="font-28 text-summary m-b-10">
        {{item.hotelInfo.hoteladdress}}
      </view>
      <view class="flex-row-center font-30 border-top" style="justify-content: space-between;padding: 10rpx 0">
        <view class="text-content">金额:{{item.price}}</view>
        <text class="pre-pay-btn font-28" @tap="btnClick({{item.status}},{{index}})">{{statusBtn[item.status]}}</text>
      </view>
    </view>
  </repeat>
</template>

<script>
  import wepy from 'wepy'
  import httpUtil from '../../common/js/httputil'

  let app;
  export default class MyOrder extends wepy.page {
    config = {
      navigationBarTitleText: "我的订单"
    };
    data = {
      status:-1,
      orders: [],
      statusStr: ["待支付", "待入住", "已入住", "已取消"],
      statusBtn:["支付","退款","再订一间","再订一间"]
    };

    methods = {
      getOrder(status){
        this.status = status;
        this.getOrders();
      },
      btnClick(status,index){
        console.log(status +" "+ index);
        switch (status){
          case 0:
            this.wxPay(index);
            break;
          case 1:
            this.wxRefund(this.orders[index].id);
            break;
          case 2:
            break;
          case 3:
            break;
        }
      },
    };

    wxRefund(orderId){
      const requestHandle = {
        url: app.globalData.host + "order/wxRefund?orderId="+orderId,
      };
     httpUtil.get(requestHandle)
       .then(res=>{
         this.getOrders();
         app.showToast("退款成功");
         console.log(res);
       },error=>{
         console.log(error);
       })
    }

    wxPay(index) {
      console.log(index);
      const order = this.orders[index];
      if (order.status == 0) {
        wx.requestPayment({
          timeStamp: order.preOrder.timestamap,
          nonceStr: order.preOrder.noncestr,
          package: order.preOrder.packagestr,
          signType: 'MD5',
          paySign: order.preOrder.paysign,
          success(res) {
            console.log(res)
          },
          fail(res) {
            console.log(res)
          }
        })
      }else{
        app.globalData.hotel = order.hotelInfo;
        app.globalData.room = order.hotelRoom;
        app.navigateTo("../reserve/reserve?type=1");
      }
    }

    getOrders() {
      const requestHandle = {
        url: app.globalData.host + "order/getMyOrder?userId="+app.globalData.userInfo.id+"&status="+this.status,
      };
      httpUtil.get(requestHandle)
        .then(result => {
          this.orders = result.orders;
          this.$apply();
          console.log(result);
        }, error => {
          console.log(error);
        })
    }

    onLoad() {
      app = this.$parent;
      this.getOrders();
    }


  }
</script>

<style scoped>
  .pre-pay-btn {
    border: 1rpx #d8aa67 solid;
    background: white;
    border-radius: 6rpx;
    padding: 4rpx 20rpx;
  }

  .pre-pay-btn:active {
    border: 1rpx #d8aa67 solid;
    background: #cecece;
    border-radius: 6rpx;
    padding: 4rpx 20rpx;
  }
  .tab-item{
    flex:1;
    height: 70rpx;
    line-height: 70rpx;
    font-size: 30rpx;
    color: #000;
    text-align: center;
  }
  .tab-item-selected{
    flex:1;
    height: 70rpx;
    line-height: 70rpx;
    font-size: 30rpx;
    color: #f7a349;
    border-bottom: 6rpx solid #f7a349;
    text-align: center;
  }
</style>
