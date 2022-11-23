// pages/Mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: [
        {icon:"群组",name:"设置群号",firstline:true},
        {icon:"编辑",name:"设置字体大小",firstline:true},
        {icon:"收藏",name:"点赞收藏",firstline:false},
        {icon:"我的",name:"我的自定义频道",firstline:false},
        {icon:"时间",name:"设置定位记录间隔",firstline:false},
        {icon:"关闭",name:"注销",firstline:true},
    ]
    // 变量用于不显示弹窗
    ,isShow: false 

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  showTan(){
    this.setData({
        //取反
        isShow:!this.data.isShow
    })
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