// client/pages/login/login.js
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../vendor/wafer2-client-sdk/index');

// 引入配置
var config = require('../../config');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    smsUrl: config.service.smsSend,
    regsiterUrl: config.service.register,
    phoneNumber: '',
    password: '',
    code: '',
    inputCode: '',
    codeTime: null
  },


  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {

    wx.login({
      success: function (res) {
        console.log(res.code)
      },
      fail: function (res) { },
      complete: function (res) { },
    })

  },

  onGetUserInfo(res){
  console.log(res.detail)
  },


  /**
   * 绑定手机号输入框
   */
  bindPhoneInput: function (e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },

  /**
   * 绑定密码输入框
   */
  bindPwdInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  /**
   * 绑定验证码输入框
   */
  bindCodeInput: function (e) {
    this.setData({
      inputCode: e.detail.value
    })
  },

  /**
   * 手机号验证
   */
  checkMobile: function () {
    var _phone = this.data.phoneNumber;
    if (!(/^1[3|4|5|8][0-9]\d{8}$/.test(_phone))) {
      return false;
    }
    return true
  },

  /**
   * Toast弹窗
   */

  showToastText: function (title) {
    wx.showToast({
      title: title,
      icon: '',
      image: '',
      duration: 1000,
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 获取随机数
   */
  rand: function (number) {
    //用来存储产生的随机数
    var num = "";
    for (var i = 0; i < number; i++) {
      num += Math.floor(Math.random() * 10)
    }
    this.setData({
      code: num,
      codeTime: new Date().getTime()
    })
    return num;
  },

  /**
   * 验证手机号
   */
  detectionPhone: function () {
    //验证是否为空
    if (this.data.phoneNumber == "") {
      this.showToastText("手机号不能为空")
      return true
    }
    //验证是否是规则的手机号
    if (!this.checkMobile()) {
      this.showToastText("手机号不规则")
      return true
    }
  },
  /**
   * 验证验证码
   */
  detectionCode: function () {
    var _this = this.data
    if (_this.inputCode == "") {
      this.showToastText('请输入验证码')
      return true
    }
    if (_this.codeTime == null) {
      this.showToastText('请获取验证码')
      return true
    }
    var nowTime = new Date().getTime()
    var time = (nowTime - _this.codeTime) / 1000
    var outTime = 3 * 60
    console.log(time + "   " + outTime)
    if (time > outTime) {
      this.showToastText('验证码已超时')
      return true
    }
    console.log('code is ' + _this.code + 'inputCode is ' + _this.inputCode)
    if (_this.code != _this.inputCode) {
      this.showToastText("验证码不匹配")
      return true
    }
  },

  /**
   * 获取验证码
   */
  getSmsCode() {
    var phone = this.data.phoneNumber
    if (this.detectionPhone()) {
      return
    }
    var data = {
      phone: phone,
      code: this.rand(4)
    }
    wx.request({
      url: this.data.smsUrl,
      method: 'POST',
      data: JSON.stringify(data),
      dataType: 'JSON',
      success: function (result) {
        console.log(result)
      },

      // 响应错误
      fail: function (loginResponseError) {
        console.log(loginResponseError)
      },
    });
  },


  /**
   * 注册
   */

  doRegister() {
    if (this.detectionPhone()) {
      return
    }
    if (this.detectionCode()) {
      return
    }

    if (this.data.password == "") {
      this.showToastText("密码不能为空")
      return
    }

    var data = {
      phone: this.data.phoneNumber,
      isWeixin: 0,
      password: this.data.password
    }

    console.log(this.data.regsiterUrl)
    wx.request({
      url: this.data.regsiterUrl,
      method: 'POST',
      data: JSON.stringify(data),
      dataType: 'JSON',
      success: function (result) {
        console.log(result)
      },

      // 响应错误
      fail: function (loginResponseError) {
        console.log(loginResponseError)
      },
    })


  }

})