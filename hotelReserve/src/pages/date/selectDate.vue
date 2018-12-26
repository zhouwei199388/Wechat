<template>
  <view class="headbox2">
    <view class="headdate">日</view>
    <view class="headdate">一</view>
    <view class="headdate">二</view>
    <view class="headdate">三</view>
    <view class="headdate">四</view>
    <view class="headdate">五</view>
    <view class="headdate">六</view>
  </view>
  <view class="headbox">
    <view class="headdate">日</view>
    <view class="headdate">一</view>
    <view class="headdate">二</view>
    <view class="headdate">三</view>
    <view class="headdate">四</view>
    <view class="headdate">五</view>
    <view class="headdate">六</view>
  </view>
  <view class="mouth" wx:for="{{date}}" wx:for-item="date" wx:for-index="index">
    <view class="mouthhead">{{date[0].year}}年{{date[0].month}}月</view>
    <view class="daybox">
      <view class="day" wx:if="{{weeks[index]>0}}"></view>
      <view class="day" wx:if="{{weeks[index]>1}}"></view>
      <view class="day" wx:if="{{weeks[index]>2}}"></view>
      <view class="day" wx:if="{{weeks[index]>3}}"></view>
      <view class="day" wx:if="{{weeks[index]>4}}"></view>
      <view class="day" wx:if="{{weeks[index]>5}}"></view>
      <view class="day" wx:for="{{date}}" wx:for-index="idx" data-index="{{index}}" data-indexs="{{idx}}"
            bindtap="selectday">
        <!--<view class="actname {{item.selected === 1 ? 'bc2':''}}">{{date[idx].act.subject}}</view>-->
        <view class="{{item.selected === 1 ? 'bc':''}} {{item.isAfter ? 'color':''}}">
          {{item.day}}
        </view>
        <!--<view class="actname2 {{item.selected == 1 ? 'bc2':''}}" wx:if="{{date[idx].act.rate}}">{{date[idx].act.rate/10}}折</view>-->
      </view>
    </view>
  </view>
  <!--<view class="none88" wx:if="{{pagetype=='day'}}"></view>-->
  <!--<view class="fixedbtn" bindtap="submitbtn" >确认选择</view>-->
</template>

<script>
  import wepy from 'wepy';

  let app = null;
  export default class SignInReport extends wepy.page {
    data = {
      date: null,
      weeks: null,
      selectIndex: 0,
      selectIndexs: 0,
      startTime: null,
      endTime: null,
      clickNum: 0,
    };

    methods = {};

    dateData() {
      const that = this;
      let dataAll = [];//总日历数据
      let dataAll2 = [];//总日历数据
      let dataMonth = [];//月日历数据
      let date = new Date();
      let year = date.getFullYear();//当前年
      let week = date.getDay();//当天星期几
      let weeks = [];
      let month = date.getMonth() + 1;//当前月份
      let day = date.getDate();//当天
      let daysCount = 90;//一共显示多少天
      let dayscNow = 0;//计数器
      let monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]//月份列表
      let nowMonthList = [];//本年剩余月份
      for (let i = month; i < 13; i++) {
        nowMonthList.push(i)
      }
      let yearList = [year];//年份最大可能
      for (let i = 0; i < daysCount / 365 + 2; i++) {
        yearList.push(year + i + 1)
      }

      let leapYear = function(Year) {//判断是否闰年
        if (((Year % 4) === 0) && ((Year % 100) !== 0) || ((Year % 400) === 0)) {
          return (true);
        } else {
          return (false);
        }
      };


      for (let i = 0; i < yearList.length; i++) {//遍历年
        let mList;
        if (yearList[i] === year) {//判断当前年份
          mList = nowMonthList
        } else {
          mList = monthList
        }
        for (let j = 0; j < mList.length; j++) {//循环月份
          dataMonth = [];
          //月份天数
          let t_days = [31, 28 + leapYear(yearList[i]), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          let t_days_thisYear = [];
          if (yearList[i] === year) {
            for (let m = 0; m < nowMonthList.length; m++) {
              t_days_thisYear.push(t_days[mList[m] - 1])
            }
            t_days = t_days_thisYear
          } else {
            t_days = [31, 28 + leapYear(yearList[i]), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
          }
          for (let k = 0; k < t_days[j]; k++) {//循环每天
            dayscNow++;
            if (dayscNow < daysCount) {//如果计数器没满
              let days = k + 1;
              if (days < 10) {
                days = "0" + days
              }
              let nowDate;
              if (yearList[i] === year && mList[j] === month) {//判断当年当月
                if (k + 1 >= day) {
                  nowDate = that.setDate(yearList[i], mList[j], k + 1, days, 0, false);
                } else {
                  nowDate = that.setDate(yearList[i], mList[j], k + 1, days, 0, true);
                }
              } else {//其他情况
                nowDate = that.setDate(yearList[i], mList[j], k + 1, days, 0, false);
              }
              dataMonth.push(nowDate);
              if (k === 0) {
                let date = new Date(yearList[i] + "-" + mList[j] + "-" + k + 1);
                let weekss = date.getDay();//获取每个月第一天是周几
                weeks.push(weekss)
              }
            } else {
              break
            }

          }
          dataAll.push(dataMonth)
        }
      }
      for (let i = 0; i < dataAll.length; i++) {
        if (dataAll[i].length !== 0) {
          dataAll2.push(dataAll[i]);
        }
      }

      that.date = dataAll2;
      that.weeks = weeks;
      console.log(date);
    };


    setDate(year, month, day, days, selcted, isAfter) {
      selcted = this.isWeekDate(this.startTime, year + "-" + month + "-" + days, this.endTime);
      return {//组装自己需要的数据
        year: year,
        month: month,
        day: day,
        date: year + "" + month + days,
        isAfter: isAfter,
        selected: selcted,
        re: year + "-" + month + "-" + days,
        page: 0,
      };
    };

    /**
     * 判断是否在所选周内
     * @param date
     * @returns {number}
     */
    isWeekDate(startTime, nowTime, endTime) {
      const nowDate = new Date(nowTime.replace(/-/g, "/")).getTime();
      const startDate = new Date(startTime.replace(/-/g, "/")).getTime();
      const endDate = new Date(endTime.replace(/-/g, "/")).getTime();
      if (nowDate >= startDate && nowDate <= endDate) {
        return 1;
      } else {
        return 0;
      }
    }

    /**
     * 获取每周的开始结束日期
     * @returns {any[]}
     */
    getWeekDate(time) {
      let weekDate = [];
      const date = new Date();
      date.setTime(time);
      const strTime = date.getTime();
      let day = date.getDay();
      day = day === 0 ? 7 : day;
      let startTime = strTime - (1000 * 60 * 60 * 24) * (day - 1);
      let endTime = strTime + (1000 * 60 * 60 * 24) * (7 - day);

      console.log(startTime + "  " + endTime);
      const startDate = new Date();
      startDate.setTime(startTime);
      const endDate = new Date();
      endDate.setTime(endTime);
      weekDate[0] = this.formatDate(startDate);
      weekDate[1] = this.formatDate(endDate);

//      console.log(weekDate);
      return weekDate;
    };

    /**
     * 格式化时间
     * @param date
     * @returns {string}
     */
    formatDate(date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let day = date.getDate();
      day = day < 10 ? "0" + day : day;
      return year + "-" + month + "-" + day;
    }


    updatePage() {
      for (let i = this.page; i >= 2; i--) {
        app.getPage(i).uploadSelectDate(this.startTime, this.endTime);
      }

    }

    selectday(e) {
      this.selectIndex = e.currentTarget.dataset.index;
      this.selectIndexs = e.currentTarget.dataset.indexs;
      const isAfter = this.date[this.selectIndex][this.selectIndexs].isAfter;
      if (isAfter) return;
      const nowTime = this.date[this.selectIndex][this.selectIndexs].re;
      if (this.clickNum === 0) {
        this.startTime = nowTime;
        this.endTime = nowTime;
        this.clickNum++;
      } else {
        this.endTime = nowTime;
        this.clickNum = 0;
        this.updatePage();
        wx.navigateBack({
          delta: 1
        })
      }
      this.dateData();

    };

    onLoad(option) {
      app = this.$parent;
      this.page = option.page;
      this.startTime = option.startTime;
      this.endTime = option.endTime;
      console.log(this.startTime + "   " + this.endTime);
      this.dateData()
    }

  }
</script>

<style scoped>
  .headdate {
    height: 30px;
    background-color: white;
    flex: 1;
    text-align: center;
    line-height: 30px;
  }

  .headbox {
    display: flex;
    display: -webkit-flex;
    border-bottom: 1px solid #e5e5e5;
  }

  .headbox2 {
    display: flex;
    position: fixed;
    width: 750rpx;
    display: -webkit-flex;
    border-bottom: 1px solid #e5e5e5;
    background-color: white;
    z-index: 2;
  }

  .mouthhead {
    height: 88rpx;
    background-color: #f4f4f4;
    width: 750rpx;
    line-height: 88rpx;
    text-align: center;
  }

  .mouth {
    /* background-color: white; */
    padding-bottom: 100rpx;
  }

  .daybox {

    background-color: white;
    padding-top: 10rpx;
    padding-bottom: 10rpx;

  }

  .color {
    color: #b3c4e7;
  }

  .day {
    width: 107rpx;
    height: 107rpx;
    line-height: 107rpx;
    text-align: center;
    display: inline-block;
    position: relative;
    top: 0;
    margin-top: -10rpx;
    overflow: hidden;
    color: #353535;
    font-size: 34rpx;
  }

  .day2 {
    color: #04babe;
    width: 107rpx;
    height: 107rpx;
    line-height: 107rpx;
    text-align: center;
    display: inline-block;
    position: relative;
    bottom: 0;
    margin-top: 0;
  }

  .actname {
    color: #04babe;
    position: absolute;
    font-size: 20rpx;
    top: -30rpx;
    width: 107rpx;
    text-align: center;
  }

  .actname2 {
    color: #04babe;
    position: absolute;
    font-size: 20rpx;
    bottom: -30rpx;
    width: 107rpx;
    text-align: center;
  }

  .bc {
    background-color: #04babe;
    color: white !important;
    border-radius: 100rpx;
    width: 60rpx;
    height: 60rpx;
    text-align: center;
    line-height: 60rpx;
    margin-top: 24rpx;
    margin-left: 24rpx;
  }

  .bc2 {
    color: white !important;
  }

  .none88 {
    height: 88rpx;
    width: 750rpx;
  }

  .fixedbtn {
    position: fixed;
    top: 100%;
    width: 100%;
    color: #067df5;
    font-size: 30rpx;
    text-align: center;
    line-height: 100rpx;
    height: 100rpx;
    border-top: 1px solid #e8e8e8;
    background: #f8f8f8;
    margin-top: -100rpx;
  }
</style>
