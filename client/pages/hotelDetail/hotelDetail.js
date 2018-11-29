// client/pages/hotelDetail/hotelDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomList: [{
        roomImg: '../../image/ic_hotel_detail.jpg',
        roomName: '高级大床房',
        roomPrice: 298,
        roomSex: 30,
        roomSetting: '有早 有窗'
      },
      {
        roomImg: '../../image/ic_hotel_detail.jpg',
        roomName: '高级大床房',
        roomPrice: 298,
        roomSex: 30,
        roomSetting: '有早 有窗'
      },
      {
        roomImg: '../../image/ic_hotel_detail.jpg',
        roomName: '高级大床房',
        roomPrice: 298,
        roomSex: 30,
        roomSetting: '有早 有窗'
      },
      {
        roomImg: '../../image/ic_hotel_detail.jpg',
        roomName: '高级大床房',
        roomPrice: 298,
        roomSex: 30,
        roomSetting: '有早 有窗'
      },
      {
        roomImg: '../../image/ic_hotel_detail.jpg',
        roomName: '高级大床房',
        roomPrice: 298,
        roomSex: 30,
        roomSetting: '有早 有窗'
      }

    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  

  onReserve:function(){
    wx.navigateTo({
      url: '../reserve/reserve'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})