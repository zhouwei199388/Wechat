<style lang="less">
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
</style>
<style src='weui.css'></style>
<style src='./common/css/common.css'></style>
<script>
import wepy from 'wepy'
import 'wepy-async-function'

export default class extends wepy.app {
  config = {
    pages: [
      'pages/start',
      'pages/my/my',
      'pages/my/myOrder',
      'pages/my/modifyPhone',
      'pages/reserve/hotelDetail',
      'pages/reserve/hotelList',
      'pages/reserve/hotelIndex',
      'pages/reserve/reserve',
      'pages/date/selectDate',
      'pages/login',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '四季星酒店',
      navigationBarTextStyle: 'black'
    },
    "tabBar": {
    "list": [
      {
        "pagePath": 'pages/reserve/hotelIndex',
        "text": "预订",
        'iconPath':'images/ic_reserve_normal.png',
        "selectedIconPath":'images/ic_reserve_selected.png',
      },
      {
        "pagePath": "pages/my/my",
        "text": "我的",
        'iconPath':'images/ic_my_normal.png',
        "selectedIconPath":'images/ic_my_selected.png',
      }
    ],
    'color': '#515151',
    selectedColor:'#d8aa67',
    backgroundColor:'#fff',
    borderStyle:'#d5d5d5',
    'position':'bottom',
  },
  };

  globalData = {
    userInfo: null,
    hotel:null,
    room:null,
    host:"https://zwwjj1314.com/api/",
  };

  constructor () {
    super();
    this.use('requestfix')
  }

  hotel(){
    return this.globalData.hotel;
  }

  room(){
    return this.globalData.room;
  }
  onLaunch() {
    this.testAsync()
  }

  sleep (s) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('promise resolved')
      }, s * 1000)
    })
  }

  async testAsync () {
    const data = await this.sleep(3)
    console.log(data)
  }

  getUserInfo(cb) {
    const that = this;
    if (this.globalData.userInfo) {
      return this.globalData.userInfo
    }
    wepy.getUserInfo({
      success (res) {
        that.globalData.userInfo = res.userInfo
        cb && cb(res.userInfo)
      }
    })
  }

  getHotel(){
    this.globalData.hotel;
  }

  back(delta = 1) {
    wx.navigateBack({
      delta:delta,
    })
  }
  getPhone(){
    return this.globalData.userInfo.phone;
  }
  userInfo(){
    return this.globalData.userInfo;
  }


  getSelectDay(startDate,endDate){
    const startTime = new Date(startDate.replace(/-/g, "/")).getTime();
    const endTime = new Date(endDate.replace(/-/g, "/")).getTime();
    return (endTime - startTime) / (1000 * 60 * 60 * 24);
  }


  /**
   * 格式化时间
   * @param date
   * @returns {string}
   */
  formatDateForMandD(formatDate) {
    // let year = date.getFullYear();
    console.log(formatDate);
    const date = new Date(formatDate.replace(/-/g,"/"));
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = date.getDate();
    day = day < 10 ? "0" + day : day;
    return  month + "月" + day+"日";
  }

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

  getPrePage(){
    let pages = getCurrentPages();
    let prePage = pages[pages.length - 2];
    return prePage;
  }
  getPage(pageIndex){
    let pages = getCurrentPages();
    const page = pages[pages.length - pageIndex];
    return page;
  }

  navigateTo(url){
    wx.navigateTo({
      url:url
    })
  }

  showToast(message) {
    wx.showToast({
      title:message,
      icon:'none'
    })
  }

  showSuccessToast(message) {
    wx.showToast({
      title: message,
    })
  }
  showWarnToast(message) {
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 1500,
      image:'../images/warn.png'
    });
  }

  showLoading(message) {
    wx.showLoading({
      title: message
    })
  }
  hideLoading() {
    wx.hideLoading();
  }

  setTitle(title) {
    wx.setNavigationBarTitle({
      title: title
    });
  }
}
</script>
