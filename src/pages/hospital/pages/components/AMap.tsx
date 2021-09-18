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
  const [geocoder, setGeocoder] = useState<any>('')

  const mapClick = (e) => {
    console.log(e.lnglat)
    console.log('geocoder222', geocoder)
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
    <>
      <input id='tipinput' type='text'></input>
      <Modal
        title='高德地图'
        onCancel={onCancel}
        visible={visible}
      >
        <APILoader akay='4881b4b13c0a8d1e91061233e0f337cf' plugin='AMap.Geocoder,AMap.Autocomplete'>
          <div style={{ width: '100%', height: '300px' }} >
            <Map
              zoom={14}
              onClick={mapClick}
              ref={(instance) => {
                if (instance && instance.map) {
                  console.log('instance66666', instance)
                  const { AMap, map, container } = instance
                  if (map) {
                    // const auto = new AMap.Autocomplete({
                    //   input: 'tipinput'
                    // })
                    const geocoder1 = new AMap.Geocoder({
                      city: '010', // 城市设为北京，默认：“全国”
                      radius: 1000 // 范围，默认：500
                    })
                    console.log('geocodergeocoder', geocoder1)
                    console.log(111111, geocoder)
                    if (!geocoder) { // 不然会有无限循环渲染问题
                      setGeocoder(geocoder1)
                      console.log('ihave', geocoder)
                    }
                  }
                }
              }}
            >
              {/* {({ AMap, map, container }) => {
              console.log('map', AMap)
              if (map) {
                const geocoder1 = new AMap.Geocoder({
                  city: '010', // 城市设为北京，默认：“全国”
                  radius: 1000 // 范围，默认：500
                })
                console.log('geocodergeocoder', geocoder1)
                console.log(111111, geocoder)
                if (!geocoder) { // 不然会有无限循环渲染问题
                  setGeocoder(geocoder1)
                  console.log('ihave', geocoder)
                }
              }
              return
            }} */}
              <Geolocation
                enableHighAccuracy={true}
                timeout={10000}
                zoomToAccuracy={true}
                onComplete={(data) => {
                  console.log('返回数据：', data)
                }}
                onError={(data) => {
                  console.log('错误返回数据：', data)
                }}
              />
            </Map>
          </div>
        </APILoader>
      </Modal>
    </>
  )
}

export default AMapC
