import request from '@/utils/request'

import { LoginParamsType } from './data.d'

export async function accountLogin(params: LoginParamsType): Promise<any> {
  return request('/smarteye/smarteye-manage/user/login', {
    method: 'POST',
    data: params,
    hostTarget: 'https://nf-api-test.qdsgvision.com:20443'
  })
}
