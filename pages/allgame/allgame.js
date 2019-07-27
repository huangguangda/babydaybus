// pages/allgame/allgame.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: '',
    xcxList: '',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
  },
  lists: function(e) {
    console.log(e.currentTarget)
    var appId = e.currentTarget.dataset.jumpappid
    var path = e.currentTarget.dataset.jumpurl
        wx.navigateToMiniProgram({
          appId: appId,
          path: path,
          extraData: {
            foo: 'bar'
          },
          envVersion: 'develop',
          success(res) {
            // 打开成功
            // var jumpId = wx.getStorageSync('jumpId')
            // var openId = wx.getStorageSync('openId')
            // var ghId = 'gh_2dc66d31473a'
            // wx.request({
            //   url: 'https://hundunxcx.com:808/v1/xcx/jump/update/click/rate',
            //   data: {
            //     jumpId: jumpId,
            //     openId: openId,
            //     ghId: ghId
            //   },
            //   method: 'POST',
            //   success(res) {
            //     console.log(res.data)
            //   }
            // })

          }
        })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const ghId = 'gh_43ff8f22187b'
    var _this = this;
    wx.request({
      url: 'https://hundunxcx.com:808/back/auth/yy/xcx/banner/get/public',
      data: {
        ghId: ghId
      },
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=UTF-8',
        'userid': 'yangfang'
      },
      success(res) {
        console.log("轮播图", res.data)
        if (res.data.code == 100) {
          _this.setData({
            imgUrls: res.data.data,
          });
        }

      }
    })

    var xcxList = wx.getStorageSync('xcxList')
    console.log("allgame", xcxList)
    _this.setData({
      xcxList: xcxList,
    });
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