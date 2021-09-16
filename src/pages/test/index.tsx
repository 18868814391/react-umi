import React, { useEffect, useState } from 'react'
import { connect, Dispatch, history } from 'umi'
import { StateType } from './model'
import { TableDataType, TableListItem } from './data.d'
import { Card, Divider, Button, List } from 'antd'
import styles from './style.less'
import Comp1 from './components/comp1'

interface testPageProps {
  loading: boolean;
  visitData: TableDataType;
  updateData: Partial<TableListItem>;
  dispatch: Dispatch;
}

const TestPage: React.FC<testPageProps> = props => {
  const {
    loading,
    visitData,
    dispatch
  } = props
  const { list, pagination } = visitData

  const getList = (current: number, size?:number): void => {
    const flag = pagination.pageSize == size
    dispatch({
      type: 'questionList/list',
      payload: {
        pageSize: flag ? pagination.pageSize : size,
        pageNum: flag ? current : 1,
        source: 1,
        statusList: [1]
      }
    })
  }

  useEffect(() => {
    console.log('useEffect')
    if (!list[0]) {
      getList(1, 10)
    }
  }, [])

  const refresh = () => {
    getList(1, 10)
  }
  const goHistory = () => {
    console.log('history')
    history.push({
      pathname: '/test/history'
    })
  }
  return (
    <div className='indexlayout-main-conent'>
      <Card bordered={false}>
        <Button type='primary' className={styles.btn1} onClick={goHistory}>历史问答</Button>
        <Button type='primary' onClick={refresh}>刷新</Button>
        <Divider />
        <List
          itemLayout='horizontal'
          rowKey='id'
          loading={loading}
          pagination={{
            ...pagination,
            onChange: (page: number, size:number) => {
              getList(page, size)
            }
          }}
          dataSource={list}
          renderItem={item => (
            <List.Item
              actions={[
                <Button type='primary'>
                  立即回答
                </Button>
              ]}
            >
              <Comp1 itemData={item}/>
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}

export default connect(
  ({
    questionList,
    loading
  }: {
    questionList: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    loading: loading.effects['questionList/list'],
    visitData: questionList.tableData,
    createSubmitLoading: loading.effects['ListBasic/createTableData'],
    updateData: questionList.updateData,
    updateSubmitLoading: loading.effects['ListBasic/updateTableData']
  })
)(TestPage)
