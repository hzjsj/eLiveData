/**
 * 网络请求封装
 */

const config = {
  DOMAIN: "https://elivedate.kdsa.cn"
}
// 获取接口地址
const _getPath = path => (config.DOMAIN + path)

/**
 * get 请求， post 请求
 * @param {String} path 请求url，必须
 * @param {Object} params 请求参数，可选
 * @param {String} method 请求方式 默认为 POST
 * @param {Object} option 可选配置，如设置请求头 { headers:{} }
 *
 * option = {
 *  headers: {} // 请求头
 * }
 *
 */

export const postAjax = (path, params) => {
  const url = _getPath(path)
  const data = params

  const method = 'GET'

  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      success: (res) => {
        resolve(res.data)
      },
      fail: function (res) {
        reject(res.data)
      }
    });
  })
}