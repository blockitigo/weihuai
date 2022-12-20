const App = getApp()
let col1H = 0;
let col2H = 0;

Page({
  data: {
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: [],
    cname:[],
    imgUrl: [
      'https://121.199.66.137:8082/share/shop/image/7.png',
      'https://121.199.66.137:8082/share/shop/image/2.png',
      'https://121.199.66.137:8082/share/shop/image/3.png',
      'https://121.199.66.137:8082/share/shop/image/7.png',
      'https://121.199.66.137:8082/share/shop/image/5.png',
      'https://121.199.66.137:8082/share/shop/image/6.png'
    ], //轮播图

    // 自定义顶部导航
    navHeight: App.globalData.navHeight,
    navTop: App.globalData.navTop,
    // 图标
    searchIcon: "/images/搜索.png",
    // searchresult: false,
    inputValue: "", //输入框输入的值
    replaceValue: "", //替换输入框的值
    eye: true, //显示隐藏
    searchresult: false,
    searchResult: [{
      result: "苹果手机"
    }, {
      result: "手机支架"
    }, {
      result: "手机自营"
    }, {
      result: "手机套"
    }, {
      result: "手机膜"
    }, {
      result: "手机卡"
    }, {
      result: "手机报"
    }, {
      result: "苹果手机壳"
    }, {
      result: "手机车载支架"
    }] //虚拟的查询结果
  },

  // 轮播图跳转链接
  toChannel: function (){
    wx.navigateTo({
      url: '/pages/shop/channel',
    })
  },

  
  /**
   * 获取顶部固定高度
   */
  attached: function () {
    this.setData({
      navHeight: App.globalData.navHeight,
      navTop: App.globalData.navTop,
    })
  },
  

  /**
   * 热门搜索显示隐藏
   */
  reye: function () {
    this.setData({
      eye: !this.data.eye
    })
  },

  /**
   * 清除
   */
  remove: function () {
    var _this = this
    wx: wx.showModal({
      content: '确认清除所有历史记录?',
      success: function (res) {
        if (res.confirm) {
          wx: wx.removeStorage({
            key: 'historyStorage',
            success: function (res) {
              _this.setData({
                historyStorage: []
              })
              wx.setStorageSync("historyStorage", [])
            },
          })
        }
        else {
          console.log("点击取消")
        }
      },
    })
  },


  /**
   * 获取input的值
   */
  getInputValue(e) {
    // console.log("获取value值",e.detail)   // {value: "ff", cursor: 2}
    this.setData({
      inputValue: e.detail.value
    })
    this.setData({
      searchresult: true,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 历史搜索
    let that = this
      wx.getSystemInfo({
        success: (res) => {
          let ww = res.windowWidth;
          let wh = res.windowHeight;
          let imgWidth = ww * 0.48;
          let scrollH = wh;

          this.setData({
            scrollH: scrollH,
            imgWidth: imgWidth
          });

          // 此为加载瀑布流图片
          this.loadImages();

          this.loadtext();
        },
        
      })
  },

  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width; //图片原始宽度
    let oImgH = e.detail.height; //图片原始高度
    let imgWidth = this.data.imgWidth; //图片设置的宽度
    let scale = imgWidth / oImgW; //比例计算
    let imgHeight = oImgH * scale; //自适应高度

    let images = this.data.images;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    if (col1H <= col2H) {
      col1H += imgHeight;
      col1.push(imageObj);
    } else {
      col2H += imgHeight;
      col2.push(imageObj);
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    if (!loadingCount) {
      data.images = [];
    }

    this.setData(data);
  },

  loadtext:function(){
    wx.request({
      url: 'https://121.199.66.137:8082/shop/category',
      method:'GET',
      success(res){
        console.log('request rse :'+res)
      }
    })
  },
  //瀑布流图片位置
  loadImages: function () {
    let images = [
        { pic: "https://121.199.66.137:8082/share/shop/category/0.png", height: 0 },
        { pic: "https://121.199.66.137:8082/share/shop/category/1.png", height: 0 },
        { pic: "https://121.199.66.137:8082/share/shop/category/2.png", height: 0 },
        { pic: "https://121.199.66.137:8082/share/shop/category/3.png", height: 0 },
        { pic: "https://121.199.66.137:8082/share/shop/category/4.png", height: 0 },
        { pic: "https://121.199.66.137:8082/share/shop/category/5.png", height: 0 },
        { pic: "https://121.199.66.137:8082/share/shop/category/6.png", height: 0 },
        { pic: "https://121.199.66.137:8082/share/shop/category/7.png", height: 0 },
        { pic: "https://121.199.66.137:8082/share/shop/category/8.png", height: 0 },

        
    ];

    let baseId = "img-" + (+new Date());

    for (let i = 0; i < images.length; i++) {
        images[i].id = baseId + "-" + i;
    }

    this.setData({
        loadingCount: images.length,
        images: images
    });
},

// 测试方法
test: function () {
  wx.request({
    url: 'https://121.199.66.137:8082/share/shop',
    method: "GET",
    success(res){
      console.log('request rse :'+res)
      // if(res.data.avatarUrl.indexOf("http")>=0)
      //   that.setData({
      //     touxiang:res.data.avatarUrl
      //   })
      // else
      // that.setData({
      //   touxiang:"https://121.199.66.137:8082/share"+res.data.avatarUrl,
      //   nname:res.data.nickName
      // })
    }
  })
  let images = [
      { pic: "https://121.199.66.137:8082/share/shop/image/1.png", height: 0 },
      // { pic: "https://121.199.66.137:8082/share/shop/image/8.png", height: 0 },
      // { pic: "https://121.199.66.137:8082/share/shop/image/9.png", height: 0 },
      // { pic: "https://121.199.66.137:8082/share/shop/image/10.png", height: 0 },
      // { pic: "https://121.199.66.137:8082/share/shop/image/11.png", height: 0 },
      // { pic: "https://121.199.66.137:8082/share/shop/image/12.png", height: 0 },
      // { pic: "https://121.199.66.137:8082/share/shop/image/13.png", height: 0 },
      // { pic: "https://121.199.66.137:8082/share/shop/image/14.png", height: 0 },
      // { pic: "https://121.199.66.137:8082/share/shop/image/15.png", height: 0 },
  ];

  let baseId = "img-" + (+new Date());

  for (let i = 0; i < images.length; i++) {
      images[i].id = baseId + "-" + i;
  }

  this.setData({
      loadingCount: images.length,
      images: images
  });
},
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})