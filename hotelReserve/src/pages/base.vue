<!--Base组件-->
<script>
  import wepy from 'wepy';
  import utils from '../common/js/utils';
  export default class Base extends wepy.page {
    data = {
    };

    methods = {
    };

    onLoad() {
      console.log("Base.onLoad");
    }

    getToken() {
      return this.$parent.token();
    }

    getSchoolId() {
      return this.$parent.getSchoolId();
    }

    setTitle(title) {
      wx.setNavigationBarTitle({
        title: title
      });
    }

    showToast(message) {
      utils.showToast(message);
    }

    navigateTo(url) {
      utils.navigateTo(url);
    }

    showModal(title, message, showCancel=true) {
      return new Promise(
        (confirm,cancel)=>{
          wx.showModal({
            title: title,
            content: message,
            showCancel:showCancel,
            success(res) {
              if (res.confirm) {
                confirm();
              } else {
                cancel();
              }
            }
          })
        }
      );
    }

    getPrePage() {
      let pages = getCurrentPages();
      return pages[pages.length - 2];
    }

    getPage(page){
      let pages = getCurrentPages();
      return pages[pages.length - page];
    }


    back(delta = 1) {
      wx.navigateBack({
        delta:delta,
      })
    }
  }

</script>

