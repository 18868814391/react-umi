import { Effect, Reducer } from 'umi'
import { ResponseData } from '@/utils/request'
import { questionList } from './service'
import { TableDataType, TableListItem } from './data.d'

export interface StateType {
  listStatus?: 'ok' | 'error';
  tableData: TableDataType;
  updateData: Partial<TableListItem>;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    list: Effect;
  };
  reducers: {
    setTableData: Reducer<StateType>;
    changeListStatus: Reducer<StateType>;
  };
}

const initState: StateType = {
  listStatus: undefined,
  tableData: {
    list: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true
    }
  },
  updateData: {}
}

const Model: ModelType = {
  namespace: 'questionList',
  state: initState,
  effects: {
    * list({ payload }, { call, put }) {
      let status
      try {
        const response: ResponseData = yield call(questionList, payload)
        const { data } = response
        yield put({
          type: 'setTableData',
          payload: {
            ...initState.tableData,
            list: data.list || [],
            pagination: {
              ...initState.tableData.pagination,
              current: payload.pageNum,
              pageSize: payload.pageSize,
              total: Number(data.total) || 0
            }
          }
        })
        status = 'ok'
      } catch (error:any) {
        if (error.message && error.message === 'CustomError') {
          status = 'error'
        }
      }

      yield put({
        type: 'changeListStatus',
        payload: status
      })

      if (status === 'ok') {
        return true
      } else if (status === 'error') {
        return false
      }
      return undefined
    }
  },
  reducers: {
    setTableData(state, { payload }) {
      return {
        ...initState,
        ...state,
        tableData: payload
      }
    },
    changeListStatus(state, { payload }) {
      return {
        ...initState,
        ...state,
        loginStatus: payload
      }
    }
  }
}

export default Model
