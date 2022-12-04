// pages/Mine/mine.js
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{
      nickName:'请点击登录',
      avatarUrl:'/images/我的.png'
    },
    menu: [
        {icon:"群组",name:"设置群号",firstline:true,bindtap:"group"},
        {icon:"编辑",name:"设置字体大小",firstline:true,bindtap:"fontsize"},
        {icon:"收藏",name:"点赞收藏",firstline:false,bindtap:"like"},
        {icon:"我的",name:"我的自定义频道",firstline:false,bindtap:"mychannel"},
        {icon:"时间",name:"设置定位记录间隔",firstline:false,bindtap:"timeStamp"},
        {icon:"关闭",name:"注销",firstline:true,bindtap:"exit"},
    ]
    // 变量用于不显示弹窗
    ,isShow: false 

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  

//从group到exit全部为跳转函数
  group(){
    wx.navigateTo({
      url: '/pages/mine/Group',
    })
  },

  fontsize(){
    wx.navigateTo({
        url: '/pages/mine/adjustFont',
      })
  },

  like(){
    wx.navigateTo({
        url: '/pages/mine/like',
      })
  },

  mychannel(){
    wx.navigateTo({
        url: '/pages/mine/minechannel',
      })

  },

  timeStamp(){
    wx.navigateTo({
        url: '/pages/mine/timestamp',
      })
  },

  edit(){

    wx.navigateTo({
        url: '/pages/mine/mydetail',
      })
  },

  exit(){

         this.setData({
        //取反
         isShow:!this.data.isShow
         })

  },

  login(){
    wx.getUserProfile({
     desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
     success: (res)=>{
       console.log(res)
       let user=res.userInfo
       this.setData({
         userinfo:user
       })
       
     }
   })
   },

  // login(){
  //   wx.request({
  //     url: 'http://114.55.95.156',
  //     success:function(res){
  //       console.log(res.data)
        
  //     }
  //   })
  // },

   logout(){
       this.setData({
         userinfo: {
          nickName:'请点击登录',
          avatarUrl:'/images/我的.png'
         },
         hasUserInfo: false,
         
       })
  },


//   showTan(){
//     this.setData({
//         //取反
//         isShow:!this.data.isShow
//     })
//   },

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