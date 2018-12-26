<template>
  <view>
    <image class='headImg' src='../../images/ic_hotel_detail.jpg'></image>

   <view class="m-20 " style="border-radius: 10rpx">
     <view class='flex-row-center border-bottom p-20 bg-white'
           style="justify-content: space-between">
       <text class='font-28'>深圳市龙岗区布吉街道乐民路41号</text>
       <view class="flex-row-center">
         <text class='font-24 text-king'>地址</text>
         <image class='icon-30' src='../../images/icon_more.png'></image>
       </view>
     </view>
     <view class='flex-row-center p-20 bg-white' style="justify-content: space-between;">
       <text class="font-28">配置</text>
       <view class="flex-row-center">
         <text class='font-24 text-king'>配置</text>
         <image class='icon-30' src='../../images/icon_more.png'></image>
       </view>
     </view>
   </view>

    <!--<view>-->
      <!--<view class='flex-row-center p-10  bg-white border-bottom'-->
            <!--style="justify-content:space-between;margin-top: 20rpx">-->
        <!--<view>-->
          <!--<text>11月15日</text>-->
          <!--<text class='font-24 text-summary'>入住</text>-->
        <!--</view>-->
        <!--<text class='font-24 text-king'>共一晚</text>-->
        <!--<view>-->
          <!--<text>11月17日</text>-->
          <!--<text class='font-24 text-summary'>离店</text>-->
        <!--</view>-->
      <!--</view>-->
    <!--</view>-->
    <repeat for="{{roomList}}" key="{{this}}">
      <view class='flex-row-center p-20 m-20 bg-white border-bottom'
            style="justify-content: space-between;border-radius: 10rpx">
        <view class='flex-row'>
          <image class='itemImg' src='{{item.roomImages[0].url}}'></image>
          <view class='flex-column m-l-20'>
            <text class='font-30'>{{item.name}}</text>
            <text class='font-24 text-summary'>{{windows[item.window]}}</text>
            <!--<text class='font-24 text-summary'>{{item.roomSex}}平米</text>-->
          </view>
        </view>
        <view style="margin-right: 20rpx">
          <text class='font-30 text-king'>￥{{item.price}}</text>
          <text class="bg-king font-30 m-l-20 text-white" @tap="toReserve"
                style='padding: 10rpx 20rpx;border-radius: 10rpx'>预订
          </text>
        </view>
      </view>
    </repeat>
  </view>
</template>

<script>
  import wepy from 'wepy'
  import httpUtil from '../../common/js/httputil'

  let app = null;
  export default class HotelDetail extends wepy.page {
    data = {
      roomList: [],
      hotelId:null,
      windows:['有窗','无窗'],
    };
    methods = {
      toReserve() {
        app.navigateTo('reserve');
      }
    };
    getRoomList() {
      const requestHandle = {
        url: app.globalData.host + "room/getAllRoom?hotelId="+this.hotelId
      };
      httpUtil.get(requestHandle)
        .then(result => {
          console.log(result);
          this.roomList = result.rooms;
          this.$apply();
        }, error => {
          console.log(error);
        })
    }

    onLoad(option) {
      console.log(option.id);
      app = this.$parent;
      this.hotelId = option.id;
      this.getRoomList();
    }
  }
</script>

<style src="../../common/css/hotelDetail.css"></style>
<style src="../../common/css/common.css"></style>
