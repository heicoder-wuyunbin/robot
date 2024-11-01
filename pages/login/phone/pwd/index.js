// pages/login/phone/pwd/index.js
import request from '@/utils/request';

Page({
  data: {
    phone: '13812341234',
    password: '123456'
  },
  // 手机号+密码登录
  mylogin() {
    const phone = this.data.phone;
    const password = this.data.password;

    // 校验手机号
    if (!phone) {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none'
      });
      return;
    }
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号码格式错误',
        icon: 'none'
      });
      return;
    }

    // 校验密码
    if (!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      });
      return;
    }

    // 使用封装的请求
    request({
      url: '/member/login',
      method: 'POST',
      data: {
        phone: phone,
        password: password
      }
    }).then(res => {
      console.log(res)
      const { success, data } = res;
      if (success) {
        wx.setStorageSync('token', data.token);
        wx.showToast({
          title: '登录成功',
          icon: 'none'
        });
        wx.switchTab({
          url: "/pages/my/index"
        });
      } else {
        wx.showToast({
          title: status.message,
          icon: 'none'
        });
      }
    }).catch((err) => {
      console.log(err)
      wx.showToast({
        title: '网络异常，请重新登录',
        icon: 'none'
      });
    });
  },
  // 跳转到手机加短信验证码登录页面
  nav2code() {
    wx.redirectTo({
      url: '/pages/login/phone/code/index'
    });
  },
  // 跳转到找回密码页面
  goRetrievepasswordPage() {
    wx.navigateTo({
      url: '../retrievepassword/retrievepassword'
    });
  },
  // 监听手机号输入
  onPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  // 监听密码输入
  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  }
});