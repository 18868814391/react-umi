import React, { useEffect, useState } from 'react'
import { connect, Dispatch } from 'umi'
import {
  Card,
  Table,
  Radio,
  Input,
  Tag,
  Button,
  Divider,
  message,
  Modal,
  Row,
  Col,
  Form,
  Dropdown,
  Menu
} from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

import CreateForm from './components/CreateForm'
import UpdateForm from './components/UpdateForm'
import TypeSelect from './components/TypeSelect'

import { StateType } from './model'
import { TableDataType, TableListItem } from './data'
import { FormInstance } from 'antd/lib/form'
import { ColumnsType } from 'antd/lib/table'

const searchFormItemLayout = {
  labelCol: { span: 6, offset: 0 }
}

interface ListSearchTablePageProps {
  loading: boolean;
  visitData: TableDataType;
  createSubmitLoading: boolean;
  updateData: Partial<TableListItem>;
  updateSubmitLoading: boolean;
  dispatch: Dispatch;
}

const ListSearchTablePage: React.FC<ListSearchTablePageProps> = props => {
  const {
    loading,
    visitData,
    createSubmitLoading,
    updateData,
    updateSubmitLoading,
    dispatch
  } = props
  const { list, pagination } = visitData

  const [searchOpen, setSearchOpen] = useState<boolean>(false)
  const [searchForm] = Form.useForm()

  const [deleteLoading, setDeleteLoading] = useState<number[]>([])
  const [createFormVisible, setCreateFormVisible] = useState<boolean>(false)
  const [detailUpdateLoading, setDetailUpdateLoading] = useState<number[]>([])
  const [updateFormVisible, setUpdateFormVisible] = useState<boolean>(false)

  const searchFormSubmit = async() => {
    try {
      const fieldsValue = await searchForm.validateFields()
      console.log('search', fieldsValue)
      getList(1, 10, fieldsValue.regionIds, fieldsValue.hospitalName)
    } catch (error) {
      console.log(error)
    }
  }
  const resetSubFields = () => {
    searchForm.resetFields()
    getList(1, 10)
  }
  const getList = (current: number, size?:number, proviceArr?:Array<number>, hosName?:string): void => {
    const flag = pagination.pageSize == size
    dispatch({
      type: 'ListSearchTable1/queryTableData',
      payload: {
        pageSize: flag ? pagination.pageSize : size,
        pageNum: flag ? current : 1,
        province: proviceArr ? proviceArr[0] : '',
        city: proviceArr ? proviceArr[1] : '',
        region: proviceArr ? proviceArr[2] : '',
        hospitalName: hosName
      }
    })
  }

  const deleteTableData = (id: number): void => {
    Modal.confirm({
      title: '??????',
      content: '??????????????????',
      okText: '??????',
      cancelText: '??????',
      onOk: async() => {
        setDeleteLoading([id])
        const res: boolean = await dispatch({
          type: 'ListSearchTable1/deleteTableData',
          payload: id
        })
        if (res === true) {
          message.success('???????????????')
          getList(1)
        }
        setDeleteLoading([])
      }
    })
  }

  const createSubmit = async(
    values: Omit<TableListItem, 'id'>,
    form: FormInstance
  ) => {
    const res: boolean = await dispatch({
      type: 'ListSearchTable1/createTableData',
      payload: values
    })

    if (res === true) {
      form.resetFields()
      setCreateFormVisible(false)
      message.success('???????????????')
      getList(1)
    }
  }

  const detailUpdateData = async(id: number) => {
    setDetailUpdateLoading([id])
    const res: boolean = await dispatch({
      type: 'ListSearchTable1/queryUpdateData',
      payload: id
    })
    if (res === true) {
      setUpdateFormVisible(true)
    }
    setDetailUpdateLoading([])
  }

  const updataFormCancel = async() => {
    await dispatch({
      type: 'ListSearchTable1/setUpdateData',
      payload: {}
    })
    setUpdateFormVisible(false)
  }

  const updateSubmit = async(values: TableListItem) => {
    const res: boolean = await dispatch({
      type: 'ListSearchTable1/updateTableData',
      payload: values
    })
    if (res === true) {
      updataFormCancel()
      message.success('???????????????')
      getList(pagination.current)
    }
  }

  useEffect(() => {
    getList(1, 10)
  }, [1])

  const columns: ColumnsType<TableListItem> = [
    {
      title: '??????',
      dataIndex: 'index',
      width: 80,
      render: (_, record, index) => (
        <>{(pagination.current - 1) * pagination.pageSize + index + 1}</>
      )
    },
    {
      title: '????????????',
      dataIndex: 'name',
      render: (_, record, index) => (
        <span>
          {' '}
          {record.name}
        </span>
      )
    },
    {
      title: '????????????',
      dataIndex: 'level'
    },
    {
      title: '????????????',
      dataIndex: 'canCheck',
      render: (_, record, index) => {
        return record.canCheck === 1 ? (
          <Tag color='green'>?????????</Tag>
        ) : (
          <Tag color='cyan'>?????????</Tag>
        )
      }
    },
    {
      title: '????????????',
      dataIndex: 'psrStr'
    },
    {
      title: '????????????',
      dataIndex: 'address'
    },
    {
      title: '??????',
      key: 'action',
      width: '200px',
      render: (_, record, index) => {
        const menu = (
          <Menu>
            <Menu.Item>????????????</Menu.Item>
            <Menu.Divider />
            <Menu.Item>????????????</Menu.Item>
            <Menu.Divider />
            <Menu.Item>??????</Menu.Item>
            <Menu.Divider />
            <Menu.Item>??????</Menu.Item>
            <Menu.Divider />
            <Menu.Item>??????????????????</Menu.Item>
          </Menu>
        )
        return (
          <>
            <a>????????????</a>
            <Divider type='vertical' />
            <Dropdown overlay={menu}>
              <a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
                ?????? <DownOutlined />
              </a>
            </Dropdown>
          </>
        )
      }
    }
  ]

  return (
    <div className='indexlayout-main-conent'>
      <Card
        bordered={false}
        style={{ marginBottom: '15px' }}
        bodyStyle={{ paddingBottom: '0' }}
      >
        <Form form={searchForm} name='search'>
          <Row gutter={16} justify='end'>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item {...searchFormItemLayout} label='???????????????' name='hospitalName'>
                <Input placeholder='?????????' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item {...searchFormItemLayout} label='???????????????' name='regionIds'>
                <TypeSelect placeholder='?????????????????????' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item {...searchFormItemLayout} label='?????????' name='herf'>
                <Input placeholder='?????????' />
              </Form.Item>
            </Col>
            {searchOpen ? (
              <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                <Form.Item
                  {...searchFormItemLayout}
                  label='?????????'
                  name='remark'
                >
                  <Input placeholder='?????????' />
                </Form.Item>
              </Col>
            ) : null}
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <div
                className='text-align-right'
                style={{ paddingBottom: '24px' }}
              >
                <Button
                  type='primary'
                  htmlType='submit'
                  onClick={searchFormSubmit}
                >
                  ??????
                </Button>
                <Button
                  htmlType='button'
                  style={{ marginLeft: 8 }}
                  // onClick={() => searchForm.resetFields()}
                  onClick={resetSubFields}
                >
                  ??????
                </Button>
                <Button
                  type='link'
                  style={{ marginLeft: 8 }}
                  onClick={() => setSearchOpen(!searchOpen)}
                >
                  {searchOpen ? (
                    <>
                      ??????
                      <UpOutlined />
                    </>
                  ) : (
                    <>
                      ??????
                      <DownOutlined />
                    </>
                  )}
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card
        bordered={false}
        title={
          <Button type='primary' onClick={() => setCreateFormVisible(true)}>
            ??????
          </Button>
        }
        extra={
          <div>
            ????????????
          </div>
        }
      >
        <Table
          rowKey='id'
          columns={columns}
          dataSource={list}
          loading={loading}
          pagination={{
            ...pagination,
            onChange: (page: number, size:number) => {
              getList(page, size)
            }
          }}
        />
      </Card>

      <CreateForm
        onCancel={() => setCreateFormVisible(false)}
        visible={createFormVisible}
        onSubmit={createSubmit}
        onSubmitLoading={createSubmitLoading}
      />

      {updateFormVisible && Object.keys(updateData).length > 0 ? (
        <UpdateForm
          values={updateData}
          onCancel={() => updataFormCancel()}
          visible={updateFormVisible}
          onSubmit={updateSubmit}
          onSubmitLoading={updateSubmitLoading}
        />
      ) : null}
    </div>
  )
}

export default connect(
  ({
    ListSearchTable1,
    loading
  }: {
    ListSearchTable1: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    loading: loading.effects['ListSearchTable1/queryTableData'],
    visitData: ListSearchTable1.tableData,
    createSubmitLoading: loading.effects['ListSearchTable1/createTableData'],
    updateData: ListSearchTable1.updateData,
    updateSubmitLoading: loading.effects['ListSearchTable1/updateTableData']
  })
)(ListSearchTablePage)
