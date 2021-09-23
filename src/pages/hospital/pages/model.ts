import { Effect, Reducer } from 'umi'
import { ResponseData } from '@/utils/request'

import {
  queryList,
  hosList,
  dictinoary,
  removeData,
  createData,
  detailData,
  updateData
} from './service'

import { TableDataType, TableListItem } from './data.d'

export interface StateType {
  hosData:any;
  locData:any;
  hospitalId:any;
  tableData: TableDataType;
  updateData: Partial<TableListItem>;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    setLocation: Effect,
    hosId:Effect,
    queryHosList: Effect,
    setDictinary: Effect,
    queryTableData: Effect;
    deleteTableData: Effect;
    createTableData: Effect;
    queryUpdateData: Effect;
    updateTableData: Effect;
  };
  reducers: {
    setLocData:Reducer<StateType>
    hosIdData:Reducer<StateType>
    setTableData: Reducer<StateType>;
    setHosData:Reducer<StateType>
    setUpdateData: Reducer<StateType>;
  };
}

const initState: StateType = {
  locData: {},
  hospitalId: '',
  hosData: [],
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
  namespace: 'ListSearchTable1',
  state: initState,
  effects: {
    * setLocation({ payload }, { call, put }) {
      try {
        yield put({
          type: 'setLocData',
          payload: payload
        })
        return true
      } catch (error) {
        return false
      }
    },
    * hosId({ payload }, { call, put }) {
      try {
        yield put({
          type: 'hosIdData',
          payload: payload
        })
        return true
      } catch (error) {
        return false
      }
    },
    * setDictinary({ payload }, { call, put }) {
      try {
        const response: ResponseData = yield call(dictinoary, payload)
        const { data } = response
        return data
      } catch (error) {
        return error
      }
    },
    * queryTableData({ payload }, { call, put }) {
      try {
        const response: ResponseData = yield call(queryList, payload)
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
              total: data.total || 0
            }
          }
        })
        return true
      } catch (error) {
        return false
      }
    },
    * queryHosList({ payload }, { call, put }) {
      try {
        const response: ResponseData = yield call(hosList, payload)
        const { data } = response
        yield put({
          type: 'setHosData',
          payload: data
        })
        return data
      } catch (error) {
        return error
      }
    },
    * deleteTableData({ payload }, { call, put }) {
      try {
        yield call(removeData, payload)
        return true
      } catch (error) {
        return false
      }
    },
    * createTableData({ payload }, { call, put }) {
      try {
        yield call(createData, payload)
        return true
      } catch (error) {
        return false
      }
    },
    * queryUpdateData({ payload }, { call, put }) {
      try {
        const response: ResponseData = yield call(detailData, payload)
        const { data } = response
        yield put({
          type: 'setUpdateData',
          payload: {
            ...initState.updateData,
            ...data
          }
        })
        return true
      } catch (error) {
        return false
      }
    },
    * updateTableData({ payload }, { call, put }) {
      try {
        const { id, ...params } = payload
        yield call(updateData, id, { ...params })
        return true
      } catch (error) {
        return false
      }
    }
  },
  reducers: {
    setLocData(state, { payload }) {
      return {
        ...initState,
        ...state,
        locData: payload
      }
    },
    hosIdData(state, { payload }) {
      return {
        ...initState,
        ...state,
        hospitalId: payload
      }
    },
    setTableData(state, { payload }) {
      return {
        ...initState,
        ...state,
        tableData: payload
      }
    },
    setHosData(state, { payload }) {
      return {
        ...initState,
        ...state,
        hosData: payload
      }
    },
    setUpdateData(state, { payload }) {
      return {
        ...initState,
        ...state,
        updateData: payload
      }
    }
  }
}

export default Model
