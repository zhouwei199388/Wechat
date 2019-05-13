<template>

  <view class="mech-wrap">
  <view class="mech-top flex-row-center bg-white">
    <view class="{{status==-1?'tab-item-selected':'tab-item'}}" @tap="getOrder(-1)">全部</view>
    <view class="{{status==0?'tab-item-selected':'tab-item'}}" @tap="getOrder(0)">待支付</view>
    <view class="{{status==1?'tab-item-selected':'tab-item'}}" @tap="getOrder(1)">待入住</view>
    <view class="{{status==3?'tab-item-selected':'tab-item'}}" @tap="getOrder(3)">已取消</view>
  </view>
    <view class="mech-mid" style="margin-top: 80rpx;margin-bottom: 80rpx">
      <repeat for="{{orders}}">
        <view class="flex-column m-20 bg-white p-20" style="border-radius: 10rpx">
          <view class="flex-row-center border-bottom p-b-10" style="justify-content: space-between;">
            <view class="font-32 text-content">{{item.hotelInfo.hotelname}}</view>
            <view class="font-28 text-king">{{statusStr[item.status]}}</view>
          </view>
          <view class="font-28 text-content m-t-10 ">
            <text class="font-30 text-title "> 单号：</text>
            <text class="m-l-10 text-content">{{item.ordernumber}}</text>
          </view>
          <view class="font-28 text-content m-t-10 ">
            <text class="font-30 text-title "> 房型：</text>
            <text class="m-l-10 text-content">{{item.hotelRoom.name}} {{item.roomnumber}}间</text>
          </view>
          <view class="font-28 text-content m-b-10">
            <text class="font-30 text-title"> 地址：</text>
            <text class="m-l-10 text-content">{{item.hotelInfo.hoteladdress}}</text>
          </view>
          <view class="font-30 text-title m-b-20">
            入住：{{item.startdate}} <text class="text-king">共{{item.days}}晚</text> 离店：{{item.enddate}}
          </view>

          <view class="flex-row-center font-30 border-top" style="justify-content: space-between;padding: 10rpx 0">
            <view class="text-content">金额:{{item.price}}</view>
            <text class="pre-pay-btn font-28" @tap="btnClick({{item.status}},{{index}})">{{statusBtn[item.status]}}</text>
          </view>
        </view>
      </repeat>
      <noFind :text.sync="emptyMessage" hidden="{{!empty}}"></noFind>

    </view>
  </view>
  <view class='buttom flex-row-center font-24 text-white' style="justify-content: space-between;">
    <text class='text-white m-l-20'>{{hint}}</text>
  </view>
</template>

<script>
  import wepy from 'wepy'
  import httpUtil from '../../common/js/httputil'
  import noFind from '../../components/common/noFind'
  let app;
  export default class MyOrder extends wepy.page {
    config = {
      navigationBarTitleText: "我的订单"
    };
    data = {
      hint:"提示：订单当天18点前可免费取消，逾期不可取消或变更，如未入住，酒店将扣除全额房费",
      status:-1,
      empty: false,
      emptyMessage:'暂无记录数据',
      orders: [],
      statusStr: ["待支付", "待入住", "已入住", "已取消"],
      statusBtn:["支付","取消","再订一间","再订一间"]
    };
    components = {
      noFind: noFind,
    };
    methods = {
      getOrder(status){
        this.updateHint(status);
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

    updateHint(status){
      if(status==0){
        this.hint="提示：请在5分钟内完成支付操作否则默认订单取消"
      }else{
        this.hint = "提示：订单当天18点前可免费取消，逾期不可取消或变更，如未入住，酒店将扣除全额房费"
      }
    }
    wxRefund(orderId){
      let date = new Date();
      let hours = date.getHours();
      console.log(hours);
      let minutes = date.getMinutes();
      if(hours>5&&minutes>0){
         app.showToast("六点后不支持取消");
         return;
      }
      const requestHandle = {
        url: app.globalData.host + "order/wxRefund?orderId="+orderId,
      };
     httpUtil.get(requestHandle,"取消中")
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
          if(result.orders.length>0){
            this.empty = false;
          }else{
            this.empty = true;
          }
          this.$apply();
          console.log(result);
        }, error => {
          console.log(error);
        })
    }

    onLoad(option) {
      app = this.$parent;
      this.status = option.type;
      if(option.type==0){
        this.status = 0;
        app.showToast("支付失败")
      }else if(option.type==1){
        this.status = 1;
        app.showToast("支付成功")
      }else{
        this.status = -1;
      }
      this.updateHint(this.status);
      this.getOrders();
    }
  }
</script>

<style scoped>
  .buttom{
    width: 100%;
    height: 80rpx;
    background: #333333;
    position: fixed;
    bottom: 0;
  }
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
