var QcloudSms = require('qcloudsms_js')
var utils = require('./utils');
var appid = 1400156282
var appkey = "7324d0e4d31f878428d407498a2f0bc8"

var phoneNumber = '15090824065'

var templateId = 221620

var smsSign = '四季星酒店'


function callback(err,req,resData){
  if(err){

  }else{

  }
}

var sendMessage =  function(){
  var qcloudsms = QcloudSms(appid, appkey)
  var ssender = qcloudsms.SmsSingleSender()
  var params = ['221620']
ssender.sendWithParam(86,phoneNumber,templateId,
params,smsSign,"","",callb)
    
}


module.exports = {
  sendMessage: sendMessage,
};
