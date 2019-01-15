<template>

  <repeat for="{{orders}}">
     <view class="flex-column m-20 bg-white p-20" style="border-radius: 10rpx">
        <view class="flex-row-center border-bottom p-b-10" style="justify-content: space-between;">
         <view class="font-32 text-content">{{item.hotel}}</view>
         <view class="font-28 text-king">{{status[item.status]}}</view>
        </view>
       <view class="font-28 text-summary m-t-10 ">
         房型:{{item.hotelroom}} {{item.roomnumber}}间
       </view>
       <view class="font-28 text-summary">
         入住:{{item.startdate}}     共1晚      离店:{{item.enddate}}
       </view>
       <view class="font-28 text-summary m-b-10">
         地址:深圳市。。。。。布吉大道
       </view>
       <view class="flex-row-center font-30 border-top" style="justify-content: space-between">
         <view class="text-content">金额:{{item.price}}</view>
         <view>支付</view>
       </view>
     </view>
  </repeat>
</template>

<script>
  import wepy from 'wepy'
  import httpUtil from '../../common/js/httputil'
  let app;
  export default class MyOrder extends wepy.page{
    config={
      navigationBarTitleText:"我的订单"
    };
    data={
      orders:[],
      status:["待支付","待入住","已入住","已取消"]
    };

    methods = {

    };
    getOrders(){
       const requestHander = {
         url:app.globalData.host+"order/getAllOrder",
       };
       httpUtil.get(requestHander)
         .then(result=>{
           this.orders = result.orders;
           this.$apply();
             console.log(result);
         },error=>{
           console.log(error);
         })
    }
    onLoad(){
      app =this.$parent;
      this.getOrders();
    }


  }
</script>

<style scoped>

</style>
