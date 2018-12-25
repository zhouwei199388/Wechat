<template>
  <view class="root">
    <view class="flex-column m-30 bg-white p-20" style="border-radius: 10rpx ">
      <view class="flex-row font-24 text-summary p-20" style="justify-content: space-around">
        <text>入住日期</text>
        <text>住一晚</text>
        <text>离店日期</text>
      </view>
      <view class="flex-row font-32 " style="justify-content: space-around">
        <text>12月25日</text>
        <text class="text-summary">|</text>
        <text>12月30日</text>
      </view>
    </view>

    <scroll-view>
      <repeat for='{{hotelInfo}}' key='{{this}}'>
        <view class='item' @tap='onItemClick'>
          <image class='item_img' src='{{item.hotelImg}}'></image>
          <view class='flex-row p-20' style="justify-content: space-between">
            <!--<view class='font-30'>{{item.hotelName}}</view>-->
            <view class='font-30 text-summary'>{{item.hotelAddress}}</view>
            <view class='font-30 text-king'>￥{{item.price}}起</view>
          </view>
        </view>
      </repeat>
    </scroll-view>
  </view>

</template>

<script>
  import wepy from 'wepy'
  import httpUtil from '../../common/js/httputil'

  let app = null;
  export default class HotelList extends wepy.page {
    data = {
      hotelInfos: [
        {
          hotelImg: '../../images/ic_hotel_detail.jpg',
          hotelName: '四季星酒店',
          hotelAddress: '深圳市龙岗区布吉大道',
          price: 199,
        }, {
          hotelImg: '../../images/ic_hotel_detail.jpg',
          hotelName: '四季星酒店',
          hotelAddress: '深圳市龙岗区布吉大道',
          price: 199,
        }, {
          hotelImg: '../../images/ic_hotel_detail.jpg',
          hotelName: '四季星酒店',
          hotelAddress: '深圳市龙岗区布吉大道',
          price: 199,
        }, {
          hotelImg: '../../images/ic_hotel_detail.jpg',
          hotelName: '四季星酒店',
          hotelAddress: '深圳市龙岗区布吉大道',
          price: 199,
        }, {
          hotelImg: '../../images/ic_hotel_detail.jpg',
          hotelName: '四季星酒店',
          hotelAddress: '深圳市龙岗区布吉大道',
          price: 199,
        }
      ]
    };
    methods={
      onItemClick(){
         app.navigateTo('hotelDetail')
      }
    };


    getHotelList(){
      const requestHandle={
        url:app.globalData.host+'hotelInfo/get',
      };

      httpUtil.get(requestHandle)
        .then(result=>{
          this.hotelInfos = result.hotelModels;
          console.log(result);
        },error=>{
           console.log(error);
        })
    }
    onLoad(){
      app = this.$parent;
      this.getHotelList();
    }
  }
</script>

<style src="../../common/css/hotelList.css"/>
<style src="../../common/css/common.css"/>
