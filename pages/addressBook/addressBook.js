const app = getApp()

Page({
  data: {
    role: "",
    userId: "",
    friends: [],
    message: [],//封装获取到的信息
    location: [],
  },
  test(options) {
    app.globalData.toUrl = options.currentTarget.dataset.num,
      wx.navigateTo({
        url: '../out/out',
      })
  },
  // 获取定位城市名称方法
  getCity(lng, lat) {
    var that = this;
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://apis.map.qq.com/ws/geocoder/v1/?key=NDOBZ-MSZEX-5PP43-ZXE4X-BPZ3H-75FUU&location=` + lng + ',' + lat,
        success: function (res) {
          resolve(res);
        },
      })
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          role: app.globalData.userinfo.id
        })
      }
    })
    wx.request({
      url: 'https://121.199.66.137:8082/contacts?userId=' + app.globalData.userinfo.id,
      method: 'GET',
      success: function (res) {
        that.setData({
          friends: res.data
        })
      },
    })
  },
  load: function () {
    var that = this;
    wx.request({
      url: 'https://121.199.66.137:8082/home/todayposting?userId=' + app.globalData.userinfo.id,
      method: "GET",
      success: function (res) {
        that.setData({
          message: res.data
        })
      }
    })
  },
  calendar() {
    wx.redirectTo({
      url: '/pages/addressBook/calendars',
    })
  },
  trajectory() {
    wx.redirectTo({
      url: '/pages/addressBook/trajectory',
    })
  },
  son(name) {
    var that = this;
    that.setData({
      userId: name.currentTarget.dataset.id,
      role: name.currentTarget.dataset.name
    })
    that.load()
  },
})
