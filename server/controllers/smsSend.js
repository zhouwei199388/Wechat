var QcloudSms = require('qcloudsms_js')

var appid = 1400156282

var appkey = "7324d0e4d31f878428d407498a2f0bc8"

var phoneNumber = ''

var templateId = 0000

var smsSign = ''

var qcloudsms = QcloudSms(appid,appkey)


function callback(err,req,resData){
  if(err){

  }else{

  }
}

var ssender = qcloudsms.SmsSingleSender()
var params =['5678']
ssender.sendWithParam(86,phoneNumber,templateId,params,smsSign,'','',callback)