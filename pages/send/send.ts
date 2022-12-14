// 时间选择框

//引入事先写好的日期设置util.js文件
var datePicker = require('../../utils/dateSetting.js')
 
//设定当前的时间，将其设定为常量
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;


let app = getApp();
var recorder = wx.getRecorderManager();
Page({
  data: {
    imgList: [],
    fileIDs: [],
    desc: '',
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

  //获取输入内容
  getInput(event) {
    console.log("输入的内容", event.detail.value)
    this.setData({
      desc: event.detail.value
    })
  },


  //选择图片
  ChooseImage() {
    wx.chooseImage({
      count: 8 - this.data.imgList.length, //默认9,我们这里最多选择8张
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        console.log("选择图片成功", res)
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  //删除图片
  DeleteImg(e) {
    wx.showModal({
      title: '要删除这张照片吗？',
      content: '',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  //上传数据
  publish() {
    let desc = this.data.desc
    let imgList = this.data.imgList
    if (!desc || desc.length < 6) {
      wx.showToast({
        icon: "none",
        title: '内容大于6个字'
      })
      return
    }
    if (!imgList || imgList.length < 1) {
      wx.showToast({
        icon: "none",
        title: '请选择图片'
      })
      return
    }
    wx.showLoading({
      title: '发布中...',
    })

    const promiseArr = []
    //只能一张张上传 遍历临时的图片数组
    for (let i = 0; i < this.data.imgList.length; i++) {
      let filePath = this.data.imgList[i]
      let suffix = /\.[^\.]+$/.exec(filePath)[0]; // 正则表达式，获取文件扩展名
      //在每次上传的时候，就往promiseArr里存一个promise，只有当所有的都返回结果时，才可以继续往下执行
      promiseArr.push(new Promise((reslove, reject) => {
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix,
          filePath: filePath, // 文件路径
        }).then(res => {
          // get resource ID
          console.log("上传结果", res.fileID)
          this.setData({
            fileIDs: this.data.fileIDs.concat(res.fileID)
          })
          reslove()
        }).catch(error => {
          console.log("上传失败", error)
        })
      }))
    }
    //保证所有图片都上传成功
    Promise.all(promiseArr).then(res => {
      wx.cloud.database().collection('timeline').add({
        data: {
          fileIDs: this.data.fileIDs,
          date: app.getNowFormatDate(),
          createTime: db.serverDate(),
          desc: this.data.desc,
          images: this.data.imgList
        },
        success: res => {
          wx.hideLoading()
          wx.showToast({
            title: '发布成功',
          })
          console.log('发布成功', res)
          wx.navigateTo({
            url: '../pengyouquan/pengyouquan',
          })
        },
        fail: err => {
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: '网络不给力....'
          })
          console.error('发布失败', err)
        }
      })
    })
  },




  // 手指点击录音
  voice_ing_start: function () {
    console.log('手指点击录音')
    wx.showToast({
      title: '按住录音，松开发送',
      icon: 'none'
    })
    this.setData({
      voice_ing_start_date: new Date().getTime(), //记录开始点击的时间
    })
    const options = {
      duration: 10000, //指定录音的时长，单位 ms
      sampleRate: 8000, //采样率
      numberOfChannels: 1, //录音通道数
      encodeBitRate: 24000, //编码码率
      format: 'mp3', //音频格式，有效值 aac/mp3
      audioSource: 'auto',
      frameSize: 12, //指定帧大小，单位 KB
    }
    recorder.start(options) //开始录音
 
    this.animation = wx.createAnimation({
      duration: 1200,
    }) //播放按钮动画
    that.animation.scale(0.8, 0.8); //还原
    that.setData({
 
      spreakingAnimation: that.animation.export()
    })
  },
  onReady: function () {
    this.on_recorder();
  },
 
  // 录音监听事件
  on_recorder: function () {
    console.log('录音监听事件');
    recorder.onStart((res) => {
      console.log('开始录音');
    })
    recorder.onStop((res) => {
      let {
        tempFilePath
      } = res;
      console.log('停止录音,临时路径', tempFilePath);
      var x = new Date().getTime() - this.data.voice_ing_start_date
      if (x > 1000) {
        let timestamp = new Date().getTime();
        wx.cloud.uploadFile({
          cloudPath: "sounds/" + timestamp + '.mp3',
          filePath: tempFilePath,
          success: res => {
            console.log('上传成功', res)
            that.setData({
              soundUrl: res.fileID,
            })
 
            var data = {
              _qunId: 'fb16f7905e4bfa24009098dc34b910c8',
              _openId: wx.getStorageSync('openId'),
              // 消息
              text: '',
              voice: res.fileID,
              img: '',
              // 时间
              dataTime: util.nowTime(),
              // 头像
              sendOutHand: wx.getStorageSync('userInfo').avatarUrl,
              // 昵称
              sendOutname: wx.getStorageSync('userInfo').nickName
            }
            console.log(data)
            wx.cloud.callFunction({
              name: "news",
              data: data,
              success(res) {
                console.log('发送语音发送', res)
              },
              fail(res) {
                console.log('发送语音失败', res)
              }
            })
          },
        })
      }
    })
    recorder.onFrameRecorded((res) => {
      return
      console.log('onFrameRecorded  res.frameBuffer', res.frameBuffer);
      string_base64 = wx.arrayBufferToBase64(res.frameBuffer)
 
      console.log('string_base64--', string_base64)
    })
  },
  // 手指松开录音
  voice_ing_end: function () {
    console.log('手指松开录音')
 
    that.setData({
      voice_icon_click: false,
      animationData: {}
    })
    this.animation = "";
    var x = new Date().getTime() - this.data.voice_ing_start_date
    if (x < 1000) {
      console.log('录音停止，说话小于1秒！')
      wx.showModal({
        title: '提示',
        content: '说话要大于1秒！',
      })
      recorder.stop();
    } else {
      // 录音停止，开始上传
      recorder.stop();
    }
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
// 获取输入的内容
onInputtingDesc: function (e) {
  let html = e.detail.html;   //相关的html代码
  let originText = e.detail.text;  //text，不含有任何的html标签
  this.setData({
    ['topic.text']: html,
    ['topic.originText']: originText
  });
}

 
})