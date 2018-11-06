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
    phoneNumber: '',
    password: ''
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
   * 获取验证码
   */
  getSmsCode() {
    var phone = this.data.phoneNumber
    //验证是否为空
    if (phone == "") {
      this.showToastText("手机号不能为空")
      return
    }
    //验证是否是规则的手机号
    if (!this.checkMobile()) {
      this.showToastText("手机号不规则")
      return
    }
    var data = {
      phone: phone
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



  doLogin() {
     


  }

})