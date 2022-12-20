// pages/Mine/Group.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friends: '',
    phoneNumber: '',
    about: "none",
    about2: "none",
    //isshow:false,
  },
  showPop() {
    if (this.data.about === "none") {
      this.setData({
        about: "block"
      })
    } else {
      this.setData({
        about: "none"
      })
    }
  },
  searchText(e) {
    var that = this
    that.setData({
      phoneNumber: e.detail.value
    })
  },
  showPop2() {
    if (this.data.about2 === "none") {
      this.setData({
        about2: "block"
      })
    } else {
      this.setData({
        about2: "none"
      })
    }
  },
  confirm() {
    this.setData({
      about: "none",
      about2: "none"
    })
    var that = this
    this.setData({
      //取反
      isShow: !this.data.isShow
    })
    if (that.data.phoneNumber != "") {
      wx.request({
        url: 'https://121.199.66.137:8082/contacts?userId=' + app.globalData.userinfo.id + '&phoneNumber=' + that.data.phoneNumber,
        method: "PUT",
        success(res) {
          console.log(res)
        }
      })
    }
  },
  concel() {
    this.setData({
      about: "none",
      about2: "none"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    wx.request({
      url: 'https://121.199.66.137:8082/contacts?userId=' + app.globalData.userinfo.id,
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          friends: res.data
        })
      },
    })
  },
  delete(id) {
    var that = this
    wx.request({
      url: 'https://121.199.66.137:8082/contacts',
      data: {
        userId: app.globalData.userinfo.id,
        acceptUserId: id
      },
      method: 'DELETE',
      success: function (res) {
        console.log(res)
      }
    })
    that.onLoad()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})