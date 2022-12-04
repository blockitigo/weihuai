// pages/mobile/mobile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:true,
    btnstate:"default",
    mobile:""
  },
  mobileblur:function(e){
    var content = e.detail.value;
    if(content!=''){
      this.setData({
        disabled:false,
        btnstate:"primary",
        mobile:content
      });
    }else{
      this.setData({
        disabled:true,
        btnstate:"default",
        mobile:""
      });
    }
  }
})