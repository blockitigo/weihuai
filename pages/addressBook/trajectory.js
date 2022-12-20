Page({
  data: {
    longitude: 113.14278, //地图界面中心的经度
    latitude: 23.02882, //地图界面中心的纬度
    polyline: [{
      points: [],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    markers: [ //标志点的位置
    ]
  },

  onLoad: function () {
    var that = this;
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        console.log("当前位置的经纬度为：", res.latitude, res.longitude);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    }),
    wx.request({
      url: 'https://121.199.66.137:8082/home/todayposting?userId=ch&pageSize=4',
      method: 'GET',
      success:function(res){
        var point=[]
        for(var index in res.data.list){
          var mark={
            id: index,
            iconPath: "../../images/friends1.png",
            latitude: res.data.list[index].trace.latitude,
            longitude: res.data.list[index].trace.longitude,
            width: 28,
            height: 32
          }
          that.data.markers.push(mark)
          console.log(that.data.markers)
          point.push({
            latitude: res.data.list[index].trace.latitude,
            longitude: res.data.list[index].trace.longitude
          })
          
        }
        that.setData({
          polyline:[{
            points: point,
            color:"#FF0000DD",
            width: 2,
            dottedLine: true
          }]
        })
        console.log('polyline:',that.data.polyline)
      }
    })
  },
  onReady: function () {

  },

  /**
   * 地图放大缩小事件触发
   * @param {*} e 
   */
  bindregionchange(e) {
    console.log('=bindregiοnchange=', e)
  },

  /**
   * 点击地图事件，有经纬度信息返回
   * @param {*} e 
   */
  bindtapMap(e) {
    console.log('=bindtapMap=', e)
  }
})
