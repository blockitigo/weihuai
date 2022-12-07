const app = getApp()

Page({
  data: {
    imgArr:[
      '/images/message4.jpg'
    ]
  },
  previewImg:function(e){
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.imgArr;
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onLoad() {
    
  },
  calendar(){
    wx.redirectTo({
      url: '/pages/addressBook/calendars',
    })
  },
  son(){
    wx.redirectTo({
      url: '/pages/addressBook/addressBook',
    })
  },
  daughter(){
    wx.redirectTo({
      url: '/pages/addressBook/daughter',
    })
  },
  mother(){
    wx.redirectTo({
      url: '/pages/addressBook/mother',
    })
  },
  father(){
    wx.redirectTo({
      url: '/pages/addressBook/father',
    })
  },
  goto2(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  gotoMine(){
    wx.redirectTo({
      url: '/pages/mine/mine',
    })
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
})
