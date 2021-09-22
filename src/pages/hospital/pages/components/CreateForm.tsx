import React, { useState } from 'react'
import { useIntl, connect, Dispatch } from 'umi'
import { FormInstance } from 'antd/lib/form'
import { Modal, Form, Input, Button, message, Row, Col } from 'antd'
import TypeSelect from './TypeSelect'
import ImgUpload from './ImgUpload'
import AMapC from './AMap'
import { StateType } from '../model'
import { TableListItem } from '../data.d'

interface CreateFormProps {
  visitData:any;
  dispatch: Dispatch;
  visible: boolean;
  values?: Partial<TableListItem>;
  onSubmitLoading: boolean;
  onSubmit: (values: Omit<TableListItem, 'id'>, form: FormInstance) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { visible, values, onSubmit, onSubmitLoading, onCancel, visitData, dispatch } = props
  console.log('visitData', visitData)
  const { formatMessage } = useIntl()
  const [aMapVisible, setaMapVisible] = useState<boolean>(false)

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
    console.log('openMap')
    setaMapVisible(true)
  }
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
        {JSON.stringify(visitData)}
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
              <Form.Item labelCol={ { span: 6, offset: 0 } } label='地图位置' name='position'>
                <Input value={visitData.name} style={{ width: '150px' }} disabled placeholder='请选择坐标' />
                <Button style={{ marginLeft: '10px' }} type='primary' onClick={openMap}>打开地图</Button>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label='位置'
            name='type'
            rules={[
              {
                required: true,
                message: '请选择'
              }
            ]}
          >
            <TypeSelect placeholder='请选择' />
          </Form.Item>
          <Form.Item
            label='名称'
            name='name'
            rules={[
              {
                required: true,
                validator: async(rule, value) => {
                  if (value === '' || !value) {
                    throw new Error('请输入名称')
                  } else if (value.length > 15) {
                    throw new Error('长度不能大于15个字')
                  }
                }
              }
            ]}
          >
            <Input placeholder='请输入名称' />
          </Form.Item>
          <Form.Item label='备注' name='desc'>
            <Input placeholder='请输入备注' />
          </Form.Item>
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
    visitData: ListSearchTable1.locData
  })
)(CreateForm)
