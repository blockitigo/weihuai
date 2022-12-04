// pages/Mine/mydetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        menu: [
            {icon:"我的",name:"头像",firstline:true,bindtap:"group",ismore:false},
            {icon:"昵称",name:"昵称",firstline:false,bindtap:"fontsize",ismore:true,bindtap:"edit"},
            {icon:"id",name:"UID",firstline:true,ismore:false},

        ],
        isShow: false
    },

    edit(){

        this.setData({
            //取反
             isShow:!this.data.isShow
             })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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