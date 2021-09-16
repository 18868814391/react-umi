import request from '@/utils/request'

import { ListParamsType } from './data.d'

export async function questionList(params: ListParamsType): Promise<any> {
  return request('/smarteye/smarteye-manage/QAndA/queryQuestionAndAnswerDtoPage', {
    method: 'POST',
    data: params,
    hostTarget: 'https://nf-api-test.qdsgvision.com:20443'
  })
}
