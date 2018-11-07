const {
  mysql
} = require('../qcloud.js')


// 登录授权接口
module.exports = async(ctx, next) => {
  // 通过 Koa 中间件进行登录之后
  // 登录信息会被存储到 ctx.state.$wxInfo
  // 具体查看：

  // var data = ctx.request.body
  // ctx.state.code = 0
  // ctx.body = data
  var data = ctx.request.body
  var phone = data.phone
  var password = data.password
  var response = {
    code: 1,
    text: "登录成功",
  }

  await mysql('user').where({
    'userName': phone,
    "password": password
  }).then(res => {
    if (res.length > 0) {
      response.text = "登录成功"
      response.code = 0
    } else {
      response.text = "账号和密码不匹配"
    }
    ctx.body = response
    // ctx.body = res
  }).catch(err => {
    response.code = -1
    response.text = "服务端错误"
  })
}