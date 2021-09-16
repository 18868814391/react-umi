import request from '@/utils/request'

export async function queryCurrent(): Promise<any> {
  // return request('/user/info')
  return { 'code': 0, 'msg': '', 'data': { 'id': 1, 'name': 'Admins', 'avatar': '', 'roles': ['admin'] }}
}

export async function queryMessage(): Promise<any> {
  return request('/user/message')
  // return { 'code': 0, 'data': 68 }
}
