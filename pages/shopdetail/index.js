import { getStoreInfoApi } from '@/api/merchantApi'
// pages/shopdetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectIndex:0,
    storeId:"1861020037372981249",
    latitude: '', // 纬度
    longitude: '', // 经度
    commentList:[
      {
        naickname:"鸡哥",
        content:"姬霓太美",
        commend:22
      }
    ],
    mystore:{
      storeName:"",
      distance:"",
      province:"",
      city:"",
      area:"",
      address:"",
      phone:"",
      coverImage:"",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      //获取传来的商店id
      storeId:options.storeId,
    })
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
    this.getLocationAndData();
    // this.getShopDetail(this.data.storeId);
  },
  getLocationAndData() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        this.getShopDetail({
          latitude: res.latitude,
          longitude: res.longitude,
          storeId:this.data.storeId
        });

      },
      fail: (res) => {
        console.log(res)
      },
    });
  },
  getShopDetail(data){
    getStoreInfoApi(data)
    .then(res=>{
      let {data,success} = res
      console.log(res);
      if(success&&data!=null){
        this.setData({
          mystore:data
        })
      }
    })
    .catch(err=>{
      console.error("请求失败", err);
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      });
    })
  },
  onClickSelectIndex(e){
    const index = e.currentTarget.dataset.index; // 获取点击的索引
    this.setData({
      selectIndex: index // 更新选中的索引
    });
  },
})