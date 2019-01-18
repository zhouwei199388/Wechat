function showToast(message) {
  wx.showToast({
    title:message,
    icon:'none'
  })
}

function showSuccessToast(message) {
  wx.showToast({
    title: message,
  })
}


function showWarnToast(message) {
  wx.showToast({
    title: message,
    icon: 'none',
    image:'../../images/warn.svg'
  });
}

function showLoading(message) {
  wx.showLoading({
    title: message
  })
}

function hideLoading() {
  wx.hideLoading();
}

function setTitle(title) {
  wx.setNavigationBarTitle({
    title: title
  });
}

function navigateTo(url) {
  wx.navigateTo({
    url: url,
  })
}

function redirectTo(url) {
  wx.redirectTo({
    url: url,
  })
}


/**
 * 格式化时间
 * @param date
 * @returns {string}
 */
function formatDate(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let day = date.getDate();
  day = day < 10 ? "0" + day : day;
  return year + "-" + month + "-" + day;
}

//金额格式化，要求传入的单位为分,将返回 12.00格式的金额
function moneyFormat(money) {
  return (money/100).toFixed(2);
}

//判断是否包含特殊字符
function isEmojiCharacter(text){
  if (!text) {
    return false;
  }

  let reg = new RegExp("[~#^$@%&!?%*]", 'g');
  if (text.match(reg)) {
    return true;
  }
  for ( var i = 0; i < text.length; i++) {
    var hs = text.charCodeAt(i);
    if (0xd800 <= hs && hs <= 0xdbff) {
      if (text.length > 1) {
        var ls = text.charCodeAt(i + 1);
        var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
        if (0x1d000 <= uc && uc <= 0x1f77f) {
          return true;
        }
      }
    } else if (text.length > 1) {
      var ls = text.charCodeAt(i + 1);
      if (ls == 0x20e3) {
        return true;
      }
    } else {
      if (0x2100 <= hs && hs <= 0x27ff) {
        return true;
      } else if (0x2B05 <= hs && hs <= 0x2b07) {
        return true;
      } else if (0x2934 <= hs && hs <= 0x2935) {
        return true;
      } else if (0x3297 <= hs && hs <= 0x3299) {
        return true;
      } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
        || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
        || hs == 0x2b50) {
        return true;
      }
    }
  }
  return false;
}

module.exports = {
  showToast: showToast,
  showSuccessToast: showSuccessToast,
  showWarnToast: showWarnToast,
  showLoading: showLoading,
  hideLoading: hideLoading,
  setTitle: setTitle,
  moneyFormat: moneyFormat,
  navigateTo:navigateTo,
  redirectTo:redirectTo,
  isEmojiCharacter:isEmojiCharacter,
  formatDate:formatDate,
};
