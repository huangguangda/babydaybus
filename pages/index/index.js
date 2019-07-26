//引入本地json数据，这里引入的就是第一步定义的json数据
var getData = require('../../data/data.js');

Page({
  data: {
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    toView: 'red',
    scrollTop: 100,
    leassonList: [],
    actIndex: 'first',
    leassonId: '',
  },
  gomine: function() {
    var that = this;
    wx.getStorage({
      key: 'data',
      success(res) {
        console.log(res.data)
        if (res.data == 1) {
          wx.navigateTo({
            url: '/pages/allgame/allgame',
          })
        } else if (res.data == 2) {
          wx.navigateTo({
            url: '/pages/mine/mine',
          })
        } else if (res.data == 3) {
          var jumpAppId = wx.getStorageSync('jumpAppId')
          var jumpUrl = wx.getStorageSync('jumpUrl')
          wx.navigateToMiniProgram({
            appId: jumpAppId,
            path: jumpUrl,
            extraData: {
              foo: 'bar'
            },
            envVersion: 'develop',
            success(res) {
              // 打开成功
              var jumpId = wx.getStorageSync('jumpId')
              var openId = wx.getStorageSync('openId')
              var ghId = 'gh_2dc66d31473a'
              wx.request({
                url: 'https://hundunxcx.com:808/v1/xcx/jump/update/click/rate',
                data: {
                  jumpId: jumpId,
                  openId: openId,
                  ghId: ghId
                },
                method: 'POST',
                success(res) {
                  console.log(res.data)
                }
              })

            }
          })
        }
      }
    })

  },
  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    console.log(e)
  },
  scroll: function(e) {
    console.log(e)
  },
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  // tab切换事件
  changeMenu: function(e) {
    this.setData({
      actIndex: e.currentTarget.id
    })
    if (this.data.actIndex == 'first') {
      var arr = []
      for (var i = 0; i < getData.detailList.length; i++) {
        console.log(getData.detailList[i].leassonType)
        if (getData.detailList[i].leassonType == 1) {
          arr.push({
            id: getData.detailList[i].id,
            title: getData.detailList[i].title,
            leassonType: getData.detailList[i].leassonType,
          })
        }
      }
      this.setData({
        leassonList: arr.reverse()
      })
    } else if (this.data.actIndex == 'second') {
      var arr = []
      for (var i = 0; i < getData.detailList.length; i++) {
        console.log(getData.detailList[i].leassonType)
        if (getData.detailList[i].leassonType == 2) {
          arr.push({
            id: getData.detailList[i].id,
            title: getData.detailList[i].title,
            leassonType: getData.detailList[i].leassonType,
          })
        }
      }
      this.setData({
        leassonList: arr.reverse()
      })
    } else if (this.data.actIndex == 'third') {
      var arr = []
      for (var i = 0; i < getData.detailList.length; i++) {
        console.log(getData.detailList[i].leassonType)
        if (getData.detailList[i].leassonType == 3) {
          arr.push({
            id: getData.detailList[i].id,
            title: getData.detailList[i].title,
            leassonType: getData.detailList[i].leassonType,
          })
        }
      }
      this.setData({
        leassonList: arr.reverse()
      })
    }
  },
  onLoad: function() {
    console.log(getData)
    var arr = []
    for (var i = 0; i < getData.detailList.length; i++) {
      console.log(getData.detailList[i].leassonType)
      if (getData.detailList[i].leassonType == 1) {
        arr.push({
          id: getData.detailList[i].id,
          title: getData.detailList[i].title,
          leassonType: getData.detailList[i].leassonType,
        })
      }
    }
    this.setData({
      imgUrls: getData.bannerList,
      leassonList: arr.reverse()
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '宝宝天天巴士',
      path: 'pages/index/index'
    }
  }
})