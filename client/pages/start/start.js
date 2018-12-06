// client/pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
       code:null,
       signature:null,
       encryptedDate:null,
  },

login:function(){
  const that = this
  wx.login({
    success(res) {
      if (res.code) {
        //发起网络请求
        console.log(res.code)
        that.setData({
          code:res.code
        })
        // this.code = res.code
        // this.$apply()
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
},

 onGetUserInfo:function(e){
  //  console.log(e.detail)
   this.getUserInfo
 },

getUserInfo:function(){
  wx.getUserInfo({
    success: function (res) {
      console.log(res)
    }
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    that.login()
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          that.getUserInfo()
        }
      }
    })
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