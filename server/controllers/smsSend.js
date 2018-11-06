const QcloudSms = require('qcloudsms_js')

const appid = 1400156282

const appkey = "7324d0e4d31f878428d407498a2f0bc8"

// const phoneNumber = '15090824065'

const templateId = 221620

const smsSign = '四季星酒店'

var smsData = function(phoneNumber) {
  var qcloudsms = QcloudSms(appid, appkey)
  var ssender = qcloudsms.SmsSingleSender()
  var params = [getRandom(), '5']
  return new Promise(function(resolve, reject) {
    ssender.sendWithParam(86, phoneNumber, templateId,
      params, smsSign, "", "",
      function(err, req, resData) {
        if (err) {
          reject("err")
        } else {
          resolve(resData)
        }
      })
  })

}

module.exports = async(ctx, next) => {
  var data = ctx.request.body
  // ctx.body = data
  ctx.state.data = {
    phone: data.phone,
    random: data.code
  }
  // ctx.state.data = await smsData(data.phone)
}