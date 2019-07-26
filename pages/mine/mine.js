//获取应用实例
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  about: function () {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  issus: function () {
    wx.navigateTo({
      url: '/pages/issus/issus',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.userInfo) {
      that.setUserInfo(app.globalData.userInfo);
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setUserInfo(res.userInfo);
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          that.setUserInfo(res.userInfo);
        }
      })
    }
  },

  getUserInfo: function (e) {
    console.log("me-> " + e.detail.errMsg)
    console.log("me-> " + e.detail.userInfo)
    console.log("me-> " + e.detail.rawData)
    wx.login({
      success: function (res) {
        console.log(res)
        // 获取登录的临时凭证
        var code = res.code;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // 调用后端，获取微信的session_key, secret
        wx.request({
          url: '' + code,
          method: "POST",
          success: function (result) {
            console.log(result);
            // 保存用户信息到本地缓存，可以用作小程序端的拦截器
            app.setGlobalUserInfo(e.detail.userInfo);
          }
        })
      }
    })

    this.setUserInfo(e.detail.userInfo);

  },

  setUserInfo: function (userInfo) {
    if (userInfo != null) {
      app.globalData.userInfo = userInfo
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
    }
  }
})