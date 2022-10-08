let Koa = require('koa')
let Router = require('koa-router')
const cors = require('@koa/cors');
let fs = require('fs')
const staticFiles = require('koa-static')
const path = require('path')
const app = new Koa()
const router = new Router()

router.get('/getData', async ctx => {

  // 返回数据
  ctx.body = JSON.parse(fs.readFileSync('./static/user.json'));
})

//  直播数据 - 历史直播
router.get('/historylive', async ctx => {

  ctx.body = JSON.parse(fs.readFileSync('./static/historyLive.json'));
})

// 直播分析
router.get('/liveAnalysis', async ctx => {

  ctx.body = JSON.parse(fs.readFileSync('./static/liveAnalysis.json'));
})

// 用户分析
router.get('/userAnalysis', async ctx => {

  ctx.body = JSON.parse(fs.readFileSync('./static/userAnalysis.json'));
})

// 商品数据
router.get('/productData', async ctx => {

  ctx.body = JSON.parse(fs.readFileSync('./static/productList.json'));
})

// 订单数据
router.get('/orderData', async ctx => {

  ctx.body = JSON.parse(fs.readFileSync('./static/orderData.json'));
})

// 个人中心
router.get('/personalCenter', async ctx => {

  const data = {
    code: 200,
    data: {
      userName: "111",
      avatarUrl: "https://687a-hzpc-1258873690.tcb.qcloud.la/images/avatar-live.png",
      userId: 2489372598,
      createTime: "2022-09-30",
      authentication: true,
      password: true,
      question: false,
      phoneNumber: "15055005050",
      secureNumber: "150******50",
      email: ""
    }
  }
  ctx.body = data
})

router.get('/', async ctx => {

  // 返回数据
  ctx.body = "hello world!"
})

// 将koa和中间件连起来
app.use(cors()).use(router.routes())
app.use(router.allowedMethods())
/**
 *  在加了router.allowedMethods()中间件情况下，
 *  如果接口是get请求，而前端使用post请求，会返回405 Method Not Allowed ，提示方法不被允许 ，并在响应头有添加允许的请求方式；
 *  而在不加这个中间件这种情况下，则会返回 404 Not Found找不到请求地址，并且响应头没有添加允许的请求方式 。
 */
app.use(staticFiles(path.join(__dirname + './public/')));
app.use(staticFiles('./public'));
let port = 3000;
app.listen(port, () => {
  console.log('server is running on ' + ' http://localhost:' + port)
})
