<template>
  <view>
    <image class='headImg' src='../../images/ic_hotel_detail.jpg'></image>

    <view class='flex-row border-bottom p-20 bg-white' style="justify-content: space-between">
      <text class='font-30'>深圳市龙岗区布吉街道乐民路41号</text>
      <image class='icon-30' src='../../images/icon_more.png'></image>
    </view>
    <view class='flex-row p-20 bg-white' style="justify-content: space-between;">
      <view class='flex-row'>
        <view class='flex-column-center'>
          <image class='icon-40' src='../../images/icon_my.png'></image>
          <text class='font-24'>客服</text>
        </view>
        <view class='flex-column-center m-l-20'>
          <image class='icon-40' src='../../images/icon_my.png'></image>
          <text class='font-24'>电话</text>
        </view>
      </view>
      <view>
        <text class='font-24 text-king'>配置</text>
        <image class='icon-30 m-l-10' src='../../images/icon_more.png'></image>
      </view>
    </view>

    <view >
      <view class='flex-row-center p-10  bg-white border-bottom' style="justify-content:space-between;margin-top: 20rpx">
        <view>
          <text>11月15日</text>
          <text class='font-24 text-summary'>入住</text>
        </view>
        <text class='font-24 text-king'>共一晚</text>
        <view>
          <text>11月17日</text>
          <text class='font-24 text-summary'>离店</text>
        </view>
      </view>
    </view>
    <repeat for="{{roomList}}" key="{{this}}">
    <view @tap='onReserve'class='flex-row-center p-20 bg-white border-bottom' style="justify-content: space-between">
      <view class='flex-row'>
        <image class='itemImg' src='{{item.roomImg}}'></image>
        <view class='flex-column m-l-20'>
          <text class='font-30'>{{item.roomName}}</text>
          <text class='font-24 text-summary'>{{item.roomSetting}}</text>
          <text class='font-24 text-summary'>{{item.roomSex}}平米</text>
        </view>
      </view>
      <view>
        <text class='font-30 text-king'>￥{{item.roomPrice}}</text>
        <text class="bg-king font-30 text-white m-l-20" @tap="toReserve" style='padding: 10rpx 20rpx;border-radius: 10rpx'>预订</text>
      </view>
    </view>
    </repeat>
  </view>
</template>

<script>
  import wepy from 'wepy'
  import httpUtil from '../../common/js/httputil'
  let app = null;
  export default class HotelDetail extends wepy.page{
    data={
      roomList: [{
        roomImg: '../../images/ic_hotel_detail.jpg',
        roomName: '高级大床房',
        roomPrice: 298,
        roomSex: 30,
        roomSetting: '有早 有窗'
      },
        {
          roomImg: '../../images/ic_hotel_detail.jpg',
          roomName: '高级大床房',
          roomPrice: 298,
          roomSex: 30,
          roomSetting: '有早 有窗'
        },
        {
          roomImg: '../../images/ic_hotel_detail.jpg',
          roomName: '高级大床房',
          roomPrice: 298,
          roomSex: 30,
          roomSetting: '有早 有窗'
        },
        {
          roomImg: '../../images/ic_hotel_detail.jpg',
          roomName: '高级大床房',
          roomPrice: 298,
          roomSex: 30,
          roomSetting: '有早 有窗'
        },
        {
          roomImg: '../../images/ic_hotel_detail.jpg',
          roomName: '高级大床房',
          roomPrice: 298,
          roomSex: 30,
          roomSetting: '有早 有窗'
        }

      ]
    };
    methods={
      toReserve(){
          app.navigateTo('reserve');
      }

    };

    onLoad(){
        app = this.$parent;
    }
  }
</script>

<style src="../../common/css/hotelDetail.css"></style>
<style src="../../common/css/common.css"></style>
