const app = getApp()

Page({
  data: {
    buttonTop: 0,
    buttonLeft: 0,
    windowHeight: '',
    windowWidth: '',
    startPoint:"",
    x:0,
    y:0,
    imgUrl:"/images/添加.png"
  },
  transmit(){
    wx.redirectTo({
      url: '/pages/send/send',
    })
  },

  gotoMine:function(){
    wx.redirectTo({
      url: '/pages/mine/mine',
    })
  },

  goto:function(){
    wx.redirectTo({
      url: '/pages/addressBook/addressBook',
    })
  },

})
