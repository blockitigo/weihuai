// pages/send/send.ts
//引入事先写好的日期设置util.js文件
var datePicker = require('../../utils/dateSetting.js')
 
//设定当前的时间，将其设定为常量
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
let app = getApp();
var recorder = wx.getRecorderManager();

// 录音
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
    isShow1: false,
    content: "",
    images: [],
    // 时间
    time: '',
    multiArray: [],
    multiIndex: [0, 0, 0, 0, 0],
    choose_year: "",
    //重复选择器
    array: ['仅一次', '每天', '每周', '每月'],
    objectArray: [
      {
        id: 0,
        name: '仅一次'
      },
      {
        id: 1,
        name: '每天'
      },
      {
        id: 2,
        name: '每周'
      },
      {
        id: 3,
        name: '每月'
      }
    ],
    index: 0,
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
   /**
   * 获取填写的内容
   */
  getTextAreaContent: function(event) {
    console.log("输入的内容"+event.detail.value)
    this.data.content = event.detail.value;
  },
 /**
   * 选择图片
   */
  chooseImage: function(event) {
    var that = this;
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: function(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        for (var i in tempFilePaths) {
          that.data.images = that.data.images.concat(tempFilePaths[i])
        }
        // 设置图片
        that.setData({
          images: that.data.images,
        })
      },
    })
  },
   // 预览图片
   previewImg: function(e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;

    wx.previewImage({
      //当前显示图片
      current: this.data.images[index],
      //所有图片
      urls: this.data.images
    })
  },
/**
   * 删除图片
   */
  removeImg: function(event) {
    var position = event.currentTarget.dataset.index;
    this.data.images.splice(position, 1);
    // 渲染图片
    this.setData({
      images: this.data.images,
    })
  },
 /**
   * 添加到发布集合中
   */
  saveToHistoryServer: function(event) {
    var that = this;
    const db = wx.cloud.database();
    db.collection('history').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        content: that.data.content,
        date: new Date(),
        images: that.data.images,
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      },
      fail: console.error
    })
  },

  // 时间
 //Page原始的加载函数，设定multiArray，其中datePicker中的函数，会在下面的js中呈现。
 onLoad: function () {
  this.setData({
    multiArray:
      [
        [year + "年", year + 1 + "年", year + 2 + "年"],
        datePicker.determineMonth(),
        datePicker.determineDay(year, month),
        datePicker.determineHour(),
        datePicker.determineMinute()
      ],
  })
},
//最后呈现时间的函数。
bindMultiPickerChange: function (e) {
  var dateStr = this.data.multiArray[0][this.data.multiIndex[0]] +
    this.data.multiArray[1][this.data.multiIndex[1]] +
    this.data.multiArray[2][this.data.multiIndex[2]] +
    this.data.multiArray[3][this.data.multiIndex[3]] +
    this.data.multiArray[4][this.data.multiIndex[4]];
  this.setData({
    time: dateStr
  })
},
//当时间选择器呈现并进行滚动选择时间时调用该函数。
bindMultiPickerColumnChange: function (e) {
  //e.detail.column记录哪一行发生改变，e.detail.value记录改变的值（相当于multiIndex）
  switch (e.detail.column) {
    //这里case的值有0/1/2/3/4,但除了需要记录年和月来确定具体的天数外，其他的都可以暂不在switch中处理。
    case 0:
      //记录改变的年的值
      let year = this.data.multiArray[0][e.detail.value];
      this.setData({
        choose_year: year.substring(0, year.length - 1)
      })
      break;
    case 1:
      //根据选择的年与月，确定天数，并改变multiArray中天的具体值
      let month = this.data.multiArray[1][e.detail.value];
      let dayDates = datePicker.determineDay(this.data.choose_year, month.substring(0, month.length - 1));
      //这里需要额外注意，改变page中设定的data，且只要改变data中某一个值，可以采用下面这种方法
      this.setData({
        ['multiArray[2]']: dayDates
      })
      break;
  }
  //同上，上面改变的是二维数组中的某一个一维数组，这个是改变一个一维数组中某一个值，可供参考。
  this.setData({
    ["multiIndex[" + e.detail.column + "]"]: e.detail.value
  })
},
// 重复类别
bindPickerChange: function (e) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    index: e.detail.value
  })
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
  //停止录音
  stop: function () {
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      const { tempFilePath } = res
    })
  },

isShow(){
  this.setData({
    //取反
     isShow1:!this.data.isShow1
     })
},

})