// client/pages/login/login.js

// 引入配置
var config = require('../../config');
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../vendor/wafer2-client-sdk/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    smsUrl: "https://xgbqiuz6.qcloud.la/weapp/smsSend",
    phoneNumber: '',
    password: ''
  },


  /**
   * 绑定手机号输入框
   */
  bindPhoneInput: function (e) {
    this.setdata({
      phoneNumber: e.detail.value
    })
  },

  /**
   * 绑定密码输入框
   */
  bindPwdInput: function (e) {
    this.setdata({
      password: e.detail.value
    })
  },

  doLogin() {
    var data={
      name:'zw',
      pwd:123456
    }
    wx.request({
      url: this.data.smsUrl,
      method: 'GET',
      data: data,
      success: function (result) {
        console.log(result)
      },

      // 响应错误
      fail: function (loginResponseError) {
        console.log(loginResponseError)
      },
    });

    // var that = this
    // if (that.data.phoneNumber == "") {
    //   wx.showToast({
    //     title: '账号不能为空',
    //     duration: 1000,
    //     mask: true,
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})