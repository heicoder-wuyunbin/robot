import { isLogin } from '@/utils/common'
import { storePageApi } from '@/api/storeApply'
import {
  getUser
} from '@/utils/auth'
Page({
  data: {
    applys: [], // 存储申请数据
    current: 1,    // 当前页码
    pageSize: 10,   // 每页大小
    total: 0,   // 总记录数
    totalPage: 0 // 总页数
  },

  onLoad() {
    isLogin(); // 检查登录状态
  },

  onShow() {
    this.resetData(); // 初始化数据`
    this.getApplys(); // 加载数据
  },

  onReachBottom() {
    const { page, totalPage } = this.data;
    if (page < totalPage) {
      this.setData({ page: page + 1 });
      this.getApplys();
    } else {
      wx.showToast({
        title: '已经到底部了',
        icon: 'none'
      });
    }
  },

  onPullDownRefresh() {
    this.resetData(); // 重置分页数据
    this.getApplys(); // 加载第一页数据
    wx.stopPullDownRefresh(); // 停止下拉刷新

  },

  resetData() {
    this.setData({
      applys: [],
      current: 1,
      pageSize: 10,
      total: 0,
      totalPage: 0
    });
  },
  getStatusText(status) {
    switch (status) {
      case '0': return '待审核';
      case '1': return '审核通过';
      case '2': return '审核失败';
      default: return '未知状态';
    }
  },

  getStatusClass(status) {
    switch (status) {
      case '0': return 'state-pending';
      case '1': return 'state-approved';
      case '2': return 'state-rejected';
      default: return '';
    }
  },
  // 查看原因
  onClickSeeBecause(e) {
    const item = e.currentTarget.dataset.item;
    if (item.status !== '2' && item.status !== '5') return;
    wx.showModal({
      content: item.remark || '暂无原因',
      showCancel: false
    });
  },

  // 查看详情
  onClickWSDetailInfo(e) {
    const item = e.currentTarget.dataset.item;
    if (!item.id) return;
    wx.navigateTo({
      url: `../submitdetails/submitdetails?id=${item.id}`
    });
  },

  // 计算总页数
  pageTotal(rowCount, pageSize) {
    return rowCount ? Math.ceil(rowCount / pageSize) : 0;
  },

  // 获取申请列表
  getApplys() {

    wx.showLoading({ title: '加载中' });

    storePageApi({'current':this.data.current,'pageSize':this.data.pageSize}).then((res) => {
        wx.hideLoading();
        const { success, data } = res;
        if (success && data.records) {
          const { records, total } = data;
          this.setData({
            applys: this.data.applys.concat(records), // 拼接新数据
            total, // 总记录数
            totalPage: this.pageTotal(total, this.data.pageSize) // 总页数
          });
        } else {
          this.handleEmptyData();
        }
      })
      .catch((err) => {
        console.log(err);
        wx.hideLoading();
        this.handleEmptyData();
        wx.showToast({
          title: '请求失败，网络异常',
          icon: 'none'
        });
      });
  },

  handleEmptyData() {
    this.setData({
      applys: [],
      total: 0,
      totalPage: 0
    });
  },

  // 新增申请
  addApply() {
    wx.navigateTo({
      url: '/pages/store/apply/index/index'
    });
  },
  isMerchant(){
    let user = getUser()
    if(user.isMerchant == "0"){
      wx.redirectTo({
        url: 'pages/my/index'
      })
    }
  }
});