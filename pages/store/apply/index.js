// pages/store/apply/index.js
Page({
  data: {
    industry_index: 0,
    industry_array: [],
    isChain: '0',
    memberId: undefined,
    companyName: '',
    storeName: '',
    imageUrl: '', // 存储选择的图片URL
    coverImageUrl: '',
    contract: '',
    phone: '',
    industryId: '',
    cityPickerValueDefault: [0, 0, 0],
    label: '',
    provinceId: '',
    cityId: '',
    areaId: '',
    province: '',
    city: '',
    area: '',
    address: '',
    recommendation: '',
    longitude: '',
    latitude: '',
    businessHoursStart: '09:00',
    businessHoursEnd: '22:00'
  },

  onLoad() {
    const authorization = wx.getStorageSync('authorization');
    if (!authorization || Object.keys(authorization).length === 0) {
      wx.showToast({
        icon: 'none',
        title: '尚未登录, 请先登录'
      });
      wx.reLaunch({
        url: '/pages/verificationcodelogin/verificationcodelogin'
      });
      return;
    }
    this._getNavData(); // 获取行业
  },

  bindStartTimeChange(e) {
    this.setData({
      businessHoursStart: e.detail.value
    });
  },

  bindEndTimeChange(e) {
    this.setData({
      businessHoursEnd: e.detail.value
    });
  },

  onChangeChainNo() {
    this.setData({
      isChain: '0',
      companyName: ''
    });
  },

  onChangeChainYes() {
    this.setData({
      isChain: '1'
    });
  },

  onCompanyNameInput(e) {
    this.setData({
      companyName: e.detail.value
    });
  },

  onStoreNameInput(e) {
    this.setData({
      storeName: e.detail.value
    });
  },

  onContractInput(e) {
    this.setData({
      contract: e.detail.value
    });
  },

  onPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    });
  },

  onAddressInput(e) {
    this.setData({
      address: e.detail.value
    });
  },
  // 选择店内图片
  chooseImage: function () {
    wx.chooseImage({
      count: 1, // 只允许选择1张图片
      sizeType: ['original', 'compressed'], // 可以选择原图或压缩图
      sourceType: ['album', 'camera'], // 可以选择相册或相机
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]; // 获取选择的图片路径
        this.setData({
          imageUrl: tempFilePath, // 设置图片路径
        });

        // 可选：上传图片到服务器
        this.uploadImage(tempFilePath);
      },
      fail: (err) => {
        wx.showToast({
          title: '选择图片失败',
          icon: 'none',
        });
      }
    });
  },
  chooseCoverImage: function () {
    wx.chooseImage({
      count: 1, // 只允许选择1张图片
      sizeType: ['original', 'compressed'], // 可以选择原图或压缩图
      sourceType: ['album', 'camera'], // 可以选择相册或相机
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]; // 获取选择的图片路径
        this.setData({
          coverImageUrl: tempFilePath, // 设置图片路径
        });

        // 可选：上传图片到服务器
        this.uploadImage(tempFilePath);
      },
      fail: (err) => {
        wx.showToast({
          title: '选择图片失败',
          icon: 'none',
        });
      }
    });
  },

  onRecommendationInput(e) {
    this.setData({
      recommendation: e.detail.value
    });
  },

  onClickOpenAddress() {
    // 打开选择地址弹窗
    this.selectComponent('#simpleAddress').open();
  },

  onConfirmAddress(e) {
    this.setData({
      label: e.label,
      provinceId: e.provinceCode,
      cityId: e.cityCode,
      areaId: e.areaCode,
      province: e.provinceName,
      city: e.cityName,
      area: e.areaName,
      recommendation: e.recommendation,
      longitude: e.longitude,
      latitude: e.latitude
    });
  },

  onClickSubmitBtn() {
    if (this.data.isChain !== '0' && this.data.isChain !== '1') {
      wx.showToast({
        icon: 'none',
        title: '请先选择是否连锁店'
      });
      return;
    }

    if (this.data.isChain === '1' && !this.data.companyName) {
      wx.showToast({
        icon: 'none',
        title: '请输入公司名称'
      });
      return;
    }

    if (!this.data.storeName) {
      wx.showToast({
        icon: 'none',
        title: '请输入店铺名称'
      });
      return;
    }

    if (!this.data.contract) {
      wx.showToast({
        icon: 'none',
        title: '请输入联系人'
      });
      return;
    }

    if (!this.data.phone) {
      wx.showToast({
        icon: 'none',
        title: '请输入联系电话'
      });
      return;
    }

    if (!this.data.industryId) {
      wx.showToast({
        icon: 'none',
        title: '请选择行业'
      });
      return;
    }

    if (!this.data.address) {
      wx.showToast({
        icon: 'none',
        title: '请输入详细地址'
      });
      return;
    }

    // 执行提交申请操作
  },

  industry_change(e) {
    const index = e.detail.value;
    this.setData({
      industry_index: index,
      industryId: this.data.industry_array[index].id
    });
  },

  _getNavData() {
    // 模拟获取行业数据
    const industryData = [{
        name: '餐饮',
        id: 1
      },
      {
        name: '零售',
        id: 2
      },
      {
        name: '教育',
        id: 3
      }
    ];

    this.setData({
      industry_array: industryData
    });
  }
});