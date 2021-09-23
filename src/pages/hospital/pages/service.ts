import request from '@/utils/request'
import { TableListQueryParams, TableListItem } from './data.d'

// export async function queryList(params?: TableListQueryParams): Promise<any> {
//   return request('/pages/list', {
//     params
//   })
// }
interface pageListType {
  pageNum:number;
  pageSize:number;
  hospitalName:string;
  province:number;
  city:number;
  region:number;
}
export async function queryList(params: pageListType): Promise<any> {
  return request('/smarteye/smarteye-manage/hosManage/pageList', {
    method: 'GET',
    params: params,
    hostTarget: 'https://nf-api-test.qdsgvision.com:20443'
  })
}

export async function createData(
  params: Omit<TableListItem, 'id'>
): Promise<any> {
  return request('/pages/list', {
    method: 'POST',
    data: params
  })
}

export async function updateData(
  id: number,
  params: Omit<TableListItem, 'id'>
): Promise<any> {
  return request(`/pages/list/${id}`, {
    method: 'PUT',
    data: params
  })
}

export async function removeData(id: number): Promise<any> {
  return request(`/pages/list/${id}`, {
    method: 'delete'
  })
}

export async function detailData(id: number): Promise<any> {
  return request(`/pages/list/${id}`)
}

interface regionListType {
  id:any
}
export async function regionList(params: regionListType): Promise<any> {
  return request('/ng/newfuture-org/region/listById', {
    method: 'GET',
    params: params,
    hostTarget: 'https://nf-api-test.qdsgvision.com:20443'
  })
}

export async function getPresignedUrl(params: any): Promise<any> {
  return request('/ng/newfuture-file/file/getPresignedUrl', {
    method: 'POST',
    data: params,
    hostTarget: 'https://nf-api-test.qdsgvision.com:20443'
  })
}

export async function uploadFile(params: any): Promise<any> {
  return request('/ng/newfuture-file/file/insertTbresource', {
    method: 'POST',
    data: params,
    hostTarget: 'https://nf-api-test.qdsgvision.com:20443'
  })
}
export async function hosList(params: any): Promise<any> {
  return request('/ng/newfuture-org/org/hospital/list', {
    method: 'GET',
    params: params,
    hostTarget: 'https://nf-api-test.qdsgvision.com:20443'
  })
}
export async function dictinoary(params: any): Promise<any> {
  return request('/ng/newfuture-org/dict/listByMark', {
    method: 'GET',
    params: params,
    hostTarget: 'https://nf-api-test.qdsgvision.com:20443'
  })
}

