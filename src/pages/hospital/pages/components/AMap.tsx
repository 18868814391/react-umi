import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { Map, APILoader, Geolocation } from '@uiw/react-amap'

interface AMapProps {
  visible: boolean;
  onCancel: () => void;
}
const AMapC: React.FC<AMapProps> = props => {
  const { visible, onCancel } = props

  const [myMap, setMyMap] = useState<any>({})
  const [geocoder, setGeocoder] = useState<any>({})

  const mapClick = (e) => {
    console.log(e.lnglat)
    geocoder.getAddress(e.lnglat, (status, result) => {
      if (status === 'complete' && result.regeocode) {
        console.log(result)
      } else {
        console.log('根据经纬度查询地址失败')
      }
    })
  }
  const initGeocoder = () => {
    console.log('geocoder', geocoder)
  }
  // useEffect(() => {
  //   // initGeocoder()
  // }, [1])
  return (
    <Modal
      title='高德地图'
      onCancel={onCancel}
      visible={visible}
    >
      <APILoader akay='4881b4b13c0a8d1e91061233e0f337cf' plugin='AMap.Geocoder'>
        <div style={{ width: '100%', height: '300px' }} >
          <Map
            zoom={14}
            onClick={mapClick}
          >
            {({ AMap, map, container }) => {
              console.log('map', AMap)
              if (map) {
                const geocoder1 = new AMap.Geocoder({
                  city: '010', // 城市设为北京，默认：“全国”
                  radius: 1000 // 范围，默认：500
                })
                console.log('geocodergeocoder', geocoder1)
                if (!geocoder) { // 不然会有无限循环渲染问题
                  setGeocoder(geocoder1)
                }
              }
              return
            }}
            {/* <Geolocation
            // 是否使用高精度定位，默认:true
              enableHighAccuracy={true}
              // 超过10秒后停止定位，默认：5s
              timeout={10000}
              // 定位按钮的停靠位置
              // 官方 v2 不再支持
              // buttonPosition="RB"

              // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
              // 官方 v2 不再支持
              // buttonOffset={new AMap.Pixel(10, 20)}

              // 定位成功后是否自动调整地图视野到定位点
              zoomToAccuracy={true}
              onComplete={(data) => {
                console.log('返回数据：', data)
              }}
              onError={(data) => {
                console.log('错误返回数据：', data)
              }}
            /> */}
          </Map>
        </div>
      </APILoader>
    </Modal>
  )
}

export default AMapC
