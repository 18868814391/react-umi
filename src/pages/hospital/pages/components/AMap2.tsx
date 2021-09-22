import React, { useEffect, useState, useRef } from 'react'
import { Modal } from 'antd'

interface AMapProps {
  visible: boolean;
  onCancel: () => void;
}
const AMapC2: React.FC<AMapProps> = props => {
  const { visible, onCancel } = props
  const map = new AMap.Map('container', {
    zoom: 11,
    viewMode: '3D' // 使用3D视图
  })

  return (
    <>
      <Modal
        title='高德地图'
        onCancel={onCancel}
        visible={visible}
      >
        <div style={{ width: '100%', height: 500 }} id='container111'></div>
       123
      </Modal>
    </>
  )
}

export default AMapC2
