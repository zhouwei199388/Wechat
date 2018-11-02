const { mysql } = require('../qcloud.js')

module.exports = async (ctx, next) => {
  ctx.state.data = ctx.request.body
  // await mysql('cAppinfo').select('*').then(res => {
  //   ctx.state.code = 0
  //   ctx.state.data = res
  // }).catch(err => {
  //   ctx.state.code = -1
  //   throw new Error(err)
  // })

}