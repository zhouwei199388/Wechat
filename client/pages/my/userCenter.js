// client/pages/my/userCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
       islogin:false,
       moreService:[
         {
           serviceImg:'../../image/ic_user_defaut.png',
           serviceText:"我的奖品",
         },
         {
           serviceImg: '../../image/ic_user_defaut.png',
           serviceText: "修改密码",
         },
         {
           serviceImg: '../../image/ic_user_defaut.png',
           serviceText: "留言反馈",
         },
         {
           serviceImg: '../../image/ic_user_defaut.png',
           serviceText: "会员升级",
         }
       ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  toLogin(){
    wx.navigateTo({
      url: '../register/register',
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