import React, { useState, useEffect } from 'react'
import { useIntl, connect, Dispatch } from 'umi'
import { FormInstance } from 'antd/lib/form'
import { Modal, Form, Input, Button, message, Row, Col, Select } from 'antd'
// import TypeSelect from './TypeSelect'
import ImgUpload from './ImgUpload'
import AMapC from './AMap'
import SearchInp from './SearchInp'
import { StateType } from '../model'
import { TableListItem } from '../data.d'
const { Option } = Select
interface CreateFormProps {
  locData:any;
  visitData:any;
  hospitalId:any;
  dispatch: Dispatch;
  visible: boolean;
  values?: Partial<TableListItem>;
  onSubmitLoading: boolean;
  onSubmit: (values: Omit<TableListItem, 'id'>, form: FormInstance) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { visible, values, onSubmit, onSubmitLoading, onCancel, visitData, locData, hospitalId, dispatch } = props
  const { formatMessage } = useIntl()
  const [aMapVisible, setaMapVisible] = useState<boolean>(false)
  const requiredRules = [
    {
      required: true
    }
  ]

  const checkPos = (rule, value) => {
    if (visitData.name) { // 校验条件自定义
      return Promise.resolve()
    }
    return Promise.reject('请选择')
  }

  const checkHosname = (rule, value) => {
    if (hospitalId) { // 校验条件自定义
      return Promise.resolve()
    }
    return Promise.reject('请选择')
  }

  const formVals: Omit<TableListItem, 'id'> = {
    name: values?.name || '',
    desc: values?.desc || '',
    href: values?.href || '',
    type: values?.type || ''
  }

  const [form] = Form.useForm()

  const onFinish = async() => {
    try {
      const fieldsValue = await form.validateFields()
      onSubmit({ ...formVals, ...fieldsValue }, form)
    } catch (error) {
      message.warning(
        formatMessage({ id: 'app.global.form.validatefields.catch' })
      )
    }
  }
  const openMap = () => {
    setaMapVisible(true)
  }

  const [hosp_level, setHosp_level] = useState<any>([])
  const [hosp_type, setHosp_type] = useState<any>([])
  const [hosp_ownership, setHosp_ownership] = useState<any>([])
  const [is_con, setIs_con] = useState<any>([])
  const [is_base, setIs_base] = useState<any>([])
  const getDics = () => {
    dispatch({
      type: 'ListSearchTable1/setDictinary',
      payload: { mark: 'hosp_level' }
    }).then((e) => {
      setHosp_level(e)
    })
    dispatch({
      type: 'ListSearchTable1/setDictinary',
      payload: { mark: 'hosp_type' }
    }).then((e) => {
      setHosp_type(e)
    })
    dispatch({
      type: 'ListSearchTable1/setDictinary',
      payload: { mark: 'hosp_ownership' }
    }).then((e) => {
      setHosp_ownership(e)
    })
    setIs_con([{ key: 0, value: '否' }, { key: 1, value: '是' }])
    setIs_base([{ key: 0, value: '否' }, { key: 1, value: '是' }])
  }

  useEffect(() => {
    getDics()
  }, [])
  return (
    <>
      <Modal
        destroyOnClose
        maskClosable={false}
        title='新增'
        visible={visible}
        onCancel={onCancel}
        footer={[
          <Button key='back' onClick={() => onCancel()}>
          取消
          </Button>,
          <Button
            key='submit'
            type='primary'
            htmlType='submit'
            loading={onSubmitLoading}
            onClick={() => onFinish()}
          >
          提交
          </Button>
        ]}
      >
        {JSON.stringify(locData)}--{hospitalId}
        <Form
          form={form}
          name='createform'
          labelCol={{ span: 4 }}
          initialValues={{
            name: formVals.name,
            desc: formVals.desc,
            type: formVals.type
          }}
        >
          <Row>
            <Col span={6}>
              <ImgUpload></ImgUpload>
            </Col>
            <Col span={18}>
              <Form.Item rules={[{ required: true }, { validator: checkPos }]} labelCol={ { span: 6, offset: 0 } } label='地图位置' name='position'>
                <Input value={visitData.name} style={{ width: '150px' }} disabled placeholder='请选择坐标' />
                <Button style={{ marginLeft: '10px' }} type='primary' onClick={openMap}>打开地图</Button>
              </Form.Item>
              <Form.Item rules={[{ validator: checkHosname }]} labelCol={ { span: 6, offset: 0 } } label='医院名称' name='hosName'>
                <SearchInp></SearchInp>
              </Form.Item>
              <Form.Item rules={requiredRules} labelCol={ { span: 6, offset: 0 } } label='详细地址' name='addDetail'>
                <Input placeholder='请补充地址' />
              </Form.Item>
            </Col>
          </Row>
          <Row justify='space-between'>
            <Col span={11}>
              <Form.Item rules={requiredRules} labelCol={ { span: 9, offset: 0 } } label='医院编码' name='hosCode'>
                <Input placeholder='请输入医院编码' />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item rules={requiredRules} labelCol={ { span: 9, offset: 0 } } label='医院级别' name='hosLevel'>
                <Select placeholder='请选择'>
                  {hosp_level.map(item => (<Option key={item.key}>{item.value}</Option>))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify='space-between'>
            <Col span={11}>
              <Form.Item rules={requiredRules} labelCol={ { span: 9, offset: 0 } } label='医院属性' name='hosProp'>
                <Select placeholder='请选择'>
                  {hosp_type.map(item => (<Option key={item.key}>{item.value}</Option>))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item rules={requiredRules} labelCol={ { span: 9, offset: 0 } } label='医院类型' name='hosType'>
                <Select placeholder='请选择'>
                  {hosp_ownership.map(item => (<Option key={item.key}>{item.value}</Option>))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify='space-between'>
            <Col span={11}>
              <Form.Item rules={requiredRules} labelCol={ { span: 9, offset: 0 } } label='是否对接' name='isConnenct'>
                <Select placeholder='请选择'>
                  {is_con.map(item => (<Option key={item.key}>{item.value}</Option>))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item rules={requiredRules} labelCol={ { span: 9, offset: 0 } } label='是否基层' name='isBasic'>
                <Select placeholder='请选择'>
                  {is_base.map(item => (<Option key={item.key}>{item.value}</Option>))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <AMapC
          onCancel={() => setaMapVisible(false)}
          visible={aMapVisible}></AMapC>
      </Modal>
    </>
  )
}

export default connect(
  (
    { ListSearchTable1 }:
    {ListSearchTable1: StateType;loading: {effects: {[key: string]: boolean;};};}) => ({
    locData: ListSearchTable1.locData,
    visitData: ListSearchTable1.locData,
    hospitalId: ListSearchTable1.hospitalId
  })
)(CreateForm)
