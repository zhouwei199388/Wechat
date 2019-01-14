<template>
  <view>
    <image class='headImg' src='{{hotel.hotelImages[0].url}}'></image>

    <view class="m-20 " style="border-radius: 10rpx" >
      <view class='flex-row-center border-bottom p-20 item-click'
            style="justify-content: space-between" @tap="navigate">
        <text class='font-28'>{{hotel.hoteladdress}}</text>
        <view class="flex-row-center" >
          <text class='font-24 text-king'>导航</text>
          <image class='icon-30' src='../../images/icon_more.png'></image>
        </view>
      </view>
      <view class='flex-row-center p-20 item-click border-bottom' style="justify-content: space-between;">
        <text class="font-28">{{hotel.facility}}</text>
        <view class="flex-row-center">
          <text class='font-24 text-king'>配置</text>
          <image class='icon-30' src='../../images/icon_more.png'></image>
        </view>
      </view>
      <view class="flex-column bg-white p-20" style="border-radius: 10rpx ">
      <view class="flex-row font-24 text-summary p-20" style="justify-content: space-around" @tap="toSelectDate">
        <text>入住日期</text>
        <text>住{{selectDays}}晚</text>
        <text>离店日期</text>
      </view>
      <view class="flex-row font-32 " style="justify-content: space-around" @tap="toSelectDate">
        <text>{{showStartTime}}</text>
        <text class="text-summary">|</text>
        <text>{{showEndTime}}</text>
      </view>
    </view>
    </view>

    <repeat for="{{roomList}}">
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
        <view  style="margin-right: 20rpx">
          <text class='font-30 text-king'>￥{{item.price}}</text>
          <text class="btn-king-click font-30 m-l-20 text-white" @tap="toReserve({{index}})"
                style='padding: 10rpx 20rpx;border-radius: 10rpx'>预订
          </text>
        </view>
      </view>
    </repeat>

    <!-- 弹出的编辑输入框模块 -->
    <view hidden="{{!showRecordModal}}">
      <view class="modal-mask" bindtap="hideModal" catchtouchmove="preventTouchMove"></view>
      <view class="modal-dialog" style="top: 30%;">
        <view class="modal-title">{{title}}</view>
        <view class="modal-content text-center">
          请先绑定手机号
        </view>
        <view class="modal-footer">
          <view class="btn-cancel" @tap="onRecordCancel" data-status="cancel">取消</view>
          <view class="btn-confirm" @tap="onRecordConfirm" data-status="confirm">确定</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy'
  import httpUtil from '../../common/js/httputil'

  let app = null;
  export default class HotelDetail extends wepy.page {
    config={
      navigationBarTitleText:"酒店详情"
    };
    data = {
      roomList: [],
      hotelId: null,
      hotel: null,
      showRecordModal: false,
      isRecordCancel:false,
      showStartTime: "--月--日",
      showEndTime: "--月--日",
      startTime: "--月--日",
      endTime: "--月--日",
      selectDays: 1,
      windows: ['有窗', '无窗'],
    };
    methods = {
      toSelectDate() {
        app.navigateTo('../date/selectDate?startTime=' + this.startTime + '&endTime=' + this.endTime + "&page=4");
      },
      toReserve(index) {
        console.log(app.getPhone());
        if (app.getPhone()==null) {
          this.showRecordModal = true;
          return;
        }
        app.globalData.room = this.roomList[index];
        app.navigateTo('reserve?startTime=' + this.startTime + '&endTime=' + this.endTime);
      },
      onRecordCancel() {
        this.isRecordCancel = true;
        this.showRecordModal = false;
      },
      onRecordConfirm() {
        this.isRecordCancel = false;
        this.showRecordModal = false;
        app.navigateTo('../login');
      },
      navigate() {
        const hotel = this.hotel;
        if (hotel.latitude == null || hotel.longitude == null) {
          app.showToast("经纬度不存在");
        }
        wx.openLocation({
          latitude: hotel.latitude,
          longitude: hotel.longitude,
          scale: 18,
          name: hotel.addressname,
          address: hotel.hoteladdress
        })
      }

    };

    uploadSelectDate(startTime, endTime) {
      this.startTime = startTime;
      this.endTime = endTime;
      this.showStartTime = app.formatDateForMandD(startTime);
      this.showEndTime = app.formatDateForMandD(endTime);
      this.selectDays = app.getSelectDay(startTime, endTime);
    }

    getRoomList() {
      const requestHandle = {
        url: app.globalData.host + "room/getAllRoom?hotelId=" + this.hotelId
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
      this.hotel = app.hotel();
      console.log(app.hotel());
      this.hotelId = option.id;
      this.uploadSelectDate(option.startTime, option.endTime);
      this.getRoomList();
    }
  }
</script>

<style src="../../common/css/hotelDetail.css"></style>
<style src="../../common/css/modal.css"></style>
