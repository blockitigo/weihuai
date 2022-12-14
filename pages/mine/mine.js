// pages/Mine/mine.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code :"",
    list: [],
    islogin: '授权登录',
    nname: '未登录',
    touxiang: '/images/我的.png',
    lable: "这里空空如也呢",
    menu: [{
        icon: "群组",
        name: "设置群号",
        firstline: true,
        bindtap: "group"
      },
      {
        icon: "编辑",
        name: "设置字体大小",
        firstline: true,
        bindtap: "fontsize"
      },
      {
        icon: "收藏",
        name: "点赞收藏",
        firstline: false,
        bindtap: "like"
      },
      {
        icon: "我的",
        name: "我的自定义频道",
        firstline: false,
        bindtap: "mychannel"
      },
      {
        icon: "时间",
        name: "设置定位记录间隔",
        firstline: false,
        bindtap: "timeStamp"
      },
      {
        icon: "关闭",
        name: "注销",
        firstline: true,
        bindtap: "exit"
      },
    ]
    // 变量用于不显示弹窗
    //   ,
    // isShow: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  //从group到exit全部为跳转函数
  group() {
    wx.navigateTo({
      url: '/pages/MGroup/Group',
    })
  },

  fontsize() {
    wx.navigateTo({
      url: '/pages/MadjustFont/adjustFont',
    })
  },

  like() {
    wx.navigateTo({
      url: '/pages/Mlike/like',
    })
  },

  mychannel() {
    wx.navigateTo({
      url: '/pages/mine/minechannel',
    })

  },

  timeStamp() {
    wx.navigateTo({
      url: '/pages/Mtimestamp/timestamp',
    })
  },

  edit() {
    wx.navigateTo({
      url: '/pages/mine/mydetail',
    })
  },

  exit() {
    this.setData({
      //取反
      isShow: !this.data.isShow
    })

  },

  //登录
  login: function () {
    var that=this
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          that.setData({
            code: res.code,
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (info) => {
        // console.log(this.data.code)
        wx.request({
          url: 'https://121.199.66.137:8082/my/user/wxlogin',
          method: "POST",
          data: {
            code: this.data.code, // 用户登录凭证（有效期五分钟）
            encryptedData: info.encryptedData, // 包括敏感数据在内的完整用户信息的加密数据
            iv: info.iv, // 加密算法的初始向量，详见 用户数据的签名验证和加解密
            rawData: info.rawData, // 不包括敏感信息的原始数据字符串，用于计算签名
            signature: info.signature // 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息
          },
          success(res){
            console.log(res)
            if(res.data.avatarUrl.indexOf("http")>=0)
              that.setData({
                touxiang:res.data.avatarUrl
              })
            else
            that.setData({
              touxiang:"https://121.199.66.137:8082/share"+res.data.avatarUrl,
              nname:res.data.nickName
            })
          }
        })
        
      }
    })

  },



  logout() {
    this.setData({
      userinfo: {
        nickName: '请点击登录',
        avatarUrl: '/images/我的.png'
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