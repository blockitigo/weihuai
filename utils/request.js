const app = getApp()
var baseurl = "http://127.0.0.1:3000"  // 域名接口地址
const request = (url, options) => {
  // 当发起请求的时候，界面出现“数据加载中...”的Loading界面
  wx.showLoading({
    title: '数据加载中...',
    mask: true 
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseurl + url, //请求的接口地址
      timeout: 5000,    // 请求超时时间
      method: options.method, //配置method方法
      data: options.method === 'GET' ? options.data : JSON.stringify(options.data), //如果是GET,GET自动让数据成为query String,其他方法需要让options.data转化为字符串
      header: {
        'Content-Type': 'application/json; charset=UTF-8',
      }, //header中可以添加token值等
      success(request) { //监听成功后的操作
        if (request.statusCode === 200) {
          resolve(request.data)
        } else {
          reject(request.data)
        }
      },
      fail(error) {  //返回失败也同样传入reject()方法
        reject(error.data)
      },
      complete: ()=> {
        // 请求完成关闭Loading
        wx.hideLoading();
      }
    })
  })
}

//封装get方法
const get = (url, options = {}) => {
  return request(url, {
    method: 'GET',
    data: options
  })
}

//封装post方法
const post = (url, options = {}) => {
  return request(url, {
    method: 'POST',
    data: options
  })
}

//封装put方法
const put = (url, options) => {
  return request(url, {
    method: 'PUT',
    data: options
  })
}
//封装remove方法，DELETE关键字不能声明
const remove = (url, options = {}) => {
  return request(url, {
    method: 'DELETE',
    data: options
  })
}

module.exports = {
  get,
  post,
  put,
  remove
}
