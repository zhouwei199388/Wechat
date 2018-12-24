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

<script>
import wepy from 'wepy'
import 'wepy-async-function'

export default class extends wepy.app {
  config = {
    pages: [
      'pages/reserve/reserve',
      'pages/start',
      'pages/login',
      'pages/my/my',
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
        "pagePath": 'pages/reserve/reserve',
        "text": "预订",
        'iconPath':'images/icon_yuding.png',
        "selectedIconPath":'images/icon_yuding.png',
      },
      {
        "pagePath": "pages/my/my",
        "text": "我的",
        'iconPath':'images/icon_my.png',
        "selectedIconPath":'images/icon_my.png',
      }
    ],
    'color': '#707070',
    selectedColor:'#4798e8',
    backgroundColor:'#fff',
    borderStyle:'#d5d5d5',
    'position':'bottom',
  },
  };

  globalData = {
    userInfo: null,
    host:"http://101.132.195.191/",
  };

  constructor () {
    super();
    this.use('requestfix')
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

  userInfo(){
    return this.globalData.userInfo;
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
