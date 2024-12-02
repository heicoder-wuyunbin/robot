// pages/pay/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchantId:'',
    storeId:'',
    amount:'0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
  onAmountInput(e){
    this.setData({amount:e.detail.value})
  }
})