<template>
  <view class='noFind-box'>
    <view class='noFind-icon'>
      &#xe631;
    </view>
    <view class='noFind-text'>
      {{text}}
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  export default class NoFind extends wepy.component {
    props = {
      text: {
        type: String,
        default: '暂无相关的数据'
      },
    };
  }
</script>
<style src='../css/noFind.css'></style>
