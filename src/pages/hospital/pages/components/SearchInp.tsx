import React, { useState, useCallback } from 'react'
import { Select, Divider, Input, Spin } from 'antd'
import debounce from 'lodash/debounce'
import { useRequest } from 'ahooks'
import { connect, Dispatch } from 'umi'
import { StateType } from '../model'

const { Option } = Select
const index = 0

interface SearchInpProps {
  dispatch: Dispatch;
}

const SearchInp: React.FC<SearchInpProps> = props => {
  const { dispatch } = props
  const [name, setName] = useState<any>('')
  const [items, setItems] = useState<any>([])
  const [loading, setLoding] = useState<any>(false)
  const onNameChange = value => {
    console.log(value)
    setLoding(true)
    dispatch({
      type: 'ListSearchTable1/queryHosList',
      payload: { keyword: value }
    }).then((e) => {
      setItems(e)
    }).finally(() => {
      setLoding(false)
    })
  }
  const { run } = useRequest(onNameChange, {
    debounceInterval: 500,
    manual: true
  })
  const onNameChangeDebonce = (value) => {
    setName(value)
    console.log('eee', value)
    run(value)
  }
  const handleChange = (e) => {
    console.log('eeeee', e)
    dispatch({
      type: 'ListSearchTable1/hosId',
      payload: e
    })
  }
  return (
    <>
      <Select
        style={{ width: 240 }}
        placeholder='选择医院名称'
        onChange={handleChange}
        dropdownRender={menu => (
          <div>

            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
              <Input style={{ flex: 'auto' }} value={name} onChange={(e) => onNameChangeDebonce(e.target.value)} />
            </div>
            <Divider style={{ margin: '4px 0' }} />
            {loading ? <Spin size='small' /> : ''}
            {menu}
          </div>
        )}
      >
        {
          items.map(item => (
            <Option key={item.orgId}>{item.name}</Option>
          ))
        }
      </Select>
    </>
  )
}

export default connect(
  ({
    ListSearchTable1
  }: {
    ListSearchTable1: StateType;

  }) => ({
    visitData: ListSearchTable1.hosData
  })
)(SearchInp)
