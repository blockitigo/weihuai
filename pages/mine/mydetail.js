// pages/Mine/mydetail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        menu: [
            {icon:"我的",name:"头像",firstline:true,bindtap:"group",isicon:true},
            {icon:"昵称",name:"昵称",firstline:false,bindtap:"fontsize",ismore:true,bindtap:"edit",isname:true},
            // {icon:"id",name:"openID",firstline:true,isuid:true},

        ],
        name:"",
        uid:"",
        touxiang:"/images/我的.png",
        isShow: false
    },
    searchText(e){
      var that=this
      that.setData({
        name: e.detail.value
      })
    },

    edit(){

        this.setData({
            //取反
             isShow:!this.data.isShow
             })

    },
    confirm(){
      var that=this
        this.setData({
            //取反
            isShow:!this.data.isShow
          })
          if(that.data.name!=""){
            wx.request({
              url: 'https://121.199.66.137:8082/my/user?userId='+app.globalData.userinfo.id+'&nickName='+that.data.name,
              method: "PUT",
              success(res){
                console.log(res)
              }
            })
          }
    },
    concel(){
        this.setData({
            //取反
            isShow:!this.data.isShow
          })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that=this
        wx.getUserInfo({
            success: function(res){
                console.log(res)

                that.setData({
                    name: res.userInfo.nickName,
                    touxiang: res.userInfo.avatarUrl
                });
                
            }
        })
        wx.login({
          success: (res) => {
            let userCode = res.code
          },
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