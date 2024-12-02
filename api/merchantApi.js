import request from '@/utils/request'

export function getMerchantPage(params) {
    return request.post(`/merchant/store/page`, params);
}

/** 
 * 获取店铺信息
 */
export function getStoreInfoApi(data) {
  return request({
    url:`/merchant/store/getStoreInfo`,
    method:"POST",
    data:data
  });
}