// client/pages/hotelList/hotelList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
           hotelInfo:[
             {
               hotelImg: '../../image/ic_hotel_detail.jpg',
               hotelName:'四季星酒店',
               hotelAddress:'深圳市龙岗区布吉大道',
               price:199,
             }, {
               hotelImg: '../../image/ic_hotel_detail.jpg',
               hotelName: '四季星酒店',
               hotelAddress: '深圳市龙岗区布吉大道',
               price: 199,
             }, {
               hotelImg: '../../image/ic_hotel_detail.jpg',
               hotelName: '四季星酒店',
               hotelAddress: '深圳市龙岗区布吉大道',
               price: 199,
             }, {
               hotelImg: '../../image/ic_hotel_detail.jpg',
               hotelName: '四季星酒店',
               hotelAddress: '深圳市龙岗区布吉大道',
               price: 199,
             }, {
               hotelImg: '../../image/ic_hotel_detail.jpg',
               hotelName: '四季星酒店',
               hotelAddress: '深圳市龙岗区布吉大道',
               price: 199,
             }
           ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

onItemClick:function(){
  wx.navigateTo({
    url: '../hotelDetail/hotelDetail',
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