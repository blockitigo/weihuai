// pages/test/test.ts
const recorderManager = wx.getRecorderManager();
const options = {
  duration: 10000,//指定录音的时长，单位 ms
  sampleRate: 16000,//采样率
  numberOfChannels: 1,//录音通道数
  encodeBitRate: 96000,//编码码率
  format: 'mp3',//音频格式，有效值 aac/mp3
  frameSize: 50,//指定帧大小，单位 KB
}
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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

  },
  start: function(){
        //开始录音
        var that=this
        wx.authorize({
          scope: 'scope.record',
          success() {
            console.log("录音授权成功");
            //第一次成功授权后 状态切换为2
            that.setData({
              status: 2,
            })
            recorderManager.start(options);
            recorderManager.onStart(() => {
              console.log('recorder start')
            });
            //错误回调
            recorderManager.onError((res) => {
              console.log(res);
            })
          },
          fail() {
            console.log("第一次录音授权失败");
            wx.showModal({
              title: '提示',
              content: '您未授权录音，功能将无法使用',
              showCancel: true,
              confirmText: "授权",
              confirmColor: "#52a2d8",
              success: function (res) {
                if (res.confirm) {
                  //确认则打开设置页面（重点）
                  wx.openSetting({
                    success: (res) => {
                      console.log(res.authSetting);
                      if (!res.authSetting['scope.record']) {
                        //未设置录音授权
                        console.log("未设置录音授权");
                        wx.showModal({
                          title: '提示',
                          content: '您未授权录音，功能将无法使用',
                          showCancel: false,
                          success: function (res) {
    
                          },
                        })
                      } else {
                        //第二次才成功授权
                        console.log("设置录音授权成功");
                        that.setData({
                          status: 2,
                        })
                 
                        recorderManager.start(options);
                        recorderManager.onStart(() => {
                          console.log('recorder start')
                        });
                        //错误回调
                        recorderManager.onError((res) => {
                          console.log(res);
                        })
                      }
                    },
                    fail: function () {
                      console.log("授权设置录音失败");
                    }
                  })
                } else if (res.cancel) {
                  console.log("cancel");
                }
              },
              fail: function () {
                console.log("openfail");
              }
            })
          }
        })
  },
  //暂停录音
  pause: function () {
    recorderManager.pause();
    recorderManager.onPause((res) => {
      console.log('暂停录音')
    })
  },
  //继续录音
  resume: function () {
    recorderManager.resume();
    recorderManager.onStart(() => {
      console.log('重新开始录音')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },
  //停止录音
  stop: function () {
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      const { tempFilePath } = res
    })
  },
})