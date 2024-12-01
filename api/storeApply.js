import request from '@/utils/request'

export const storeApplyApi=(data)=>{
  return request({
    url: '/apply/storeApply/apply',
    data: data,
    method: 'POST',
  })
}

export const storePageApi=(data)=>{
  return request({
    url: '/apply/storeApply/page',
    method: 'POST',
    data: data
  })
} 
/** 
 * 获取店铺二维码
 * @param {string} storeApplyId 
  * @returns
 */
export function generateQrCodeByApplyIdApi(storeApplyId) {
  return request({
    url:`/merchant/store/generateQrCodeByApplyIdApi/${storeApplyId}`,
    method:"GET"
  });
}