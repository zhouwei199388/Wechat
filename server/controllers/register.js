const {
  mysql
} = require('../qcloud.js')


const uuid = require('node-uuid')

//注册接口
module.exports = async(ctx, next) => {

  var data = ctx.request.body
  var uid = await uuid.v1();
  ctx.body = ctx.request.body
  // await mysql('user').insert({
  //   'id': uid,
  //   'userName': data.phone,
  //   'password': data.password,
  //   'isWeixin': data.isWeixin
  // }).then(res => {
  //   if (res.length > 0) {
  //     response.text = "登录成功"
  //     response.code = 0
  //   } else {
  //     response.text = "账号和密码不匹配"
  //   }
  //   ctx.body = response
  //   ctx.body = res
  // }).catch(err => {
  //   response.code = -1
  //   response.text = "服务端错误"
  // })
}