// pages/login/login.js
Page({
  login(){
   wx.getUserProfile({
    desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res)=>{
      console.log(res)
      this.setData({
        userInfo: res.userInfo,
        hasUserInfo: true,
        nickname:res.userInfo.nickName
      })
    }
  })
  },
  /**
   * 页面的初始数据
   */
  data: {
    disabled:true,
    btnstate:"default",
    account:"",
    password:""
  },

  accountInput:function(e){
    var content = e.detail.value;
    if(content!=''){
      this.setData({disabled:false,btnstate:"primary",account:content});
    }else{
      this.setData({disabled:true,btnstate:"default"});
    }
  },
  pwdBlur:function(e){
    var password= e.detail.value;
    if(password!=''){
      this.setData({password:passwd});
    }
  }
})