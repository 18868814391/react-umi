import React, { useEffect, useState, useRef } from 'react'
import { Modal } from 'antd'
import { Map, APILoader, Geolocation, AutoComplete } from '@uiw/react-amap'
import { connect, Dispatch } from 'umi'
import { StateType } from '../model'
import styles from '../style.less'
interface AMapProps {
  dispatch: Dispatch;
  visible: boolean;
  onCancel: () => void;
}
const AMapC: React.FC<AMapProps> = props => {
  const { visible, onCancel, dispatch } = props

  const [geocoder, setGeocoder] = useState<any>('')
  const [locName, setLocName] = useState()
  const [lgPoint, setLgPoint] = useState<any>()
  const [areaCode, setAreaCode] = useState<any>()
  const mapClick = (e) => {
    setLgPoint([e.lnglat.lat, e.lnglat.lng])
    geocoder.getAddress(e.lnglat, (status, result) => {
      if (status === 'complete' && result.regeocode) {
        setAreaCode(result.regeocode.addressComponent.adcode)
        setLocName(result.regeocode.formattedAddress)
        updataLoc({ name: result.regeocode.formattedAddress, areaCode: result.regeocode.addressComponent.adcode, pos: [e.lnglat.lat, e.lnglat.lng] })
      } else {
        console.log('根据经纬度查询地址失败')
      }
    })
  }
  // useEffect(() => {
  //   // initGeocoder()
  // }, [1])
  const mapRef = useRef()
  const [inpLoc, setInpLoc] = useState()
  const updataLoc = (py) => {
    dispatch({
      type: 'ListSearchTable1/setLocation',
      payload: py
    })
  }
  return (
    <>
      <Modal
        title='高德地图'
        onCancel={onCancel}
        onOk={onCancel}
        visible={visible}
      >
        <APILoader akay='4881b4b13c0a8d1e91061233e0f337cf' plugin='AMap.Geocoder'>
          <div className={styles.inpHead} style={{ width: '100%', height: '50px' }}>
            <input className={styles.inpBox} id='inpp' type='text' ref={mapRef} />
            <div style={{ width: '100%' }}>
              { (
                <AutoComplete
                  input={'inpp'}
                  onSelect={(opts) => {
                    setInpLoc(opts)
                    setLocName(opts.poi.name)
                    setLgPoint([opts.poi.location.lat, opts.poi.location.lng])
                    setAreaCode(opts.poi.adcode)
                    updataLoc({ name: opts.poi.name, areaCode: opts.poi.adcode, pos: [opts.poi.location.lat, opts.poi.location.lng] })
                  }}
                />
              )}
            </div>
            <div className={styles.dataBox}>
              <p>{lgPoint}-{areaCode}</p>
              <p>{locName}</p>
            </div>
          </div>
          <div style={{ width: '100%', height: '300px' }} >
            {/* [120.313764, 30.300968] */}
            <Map
              zoom={14}
              center={lgPoint ? [lgPoint[1], lgPoint[0]] : null}
              onClick={mapClick}
              ref={(instance) => {
                if (instance && instance.map) {
                  const { AMap, map, container } = instance
                  if (map) {
                    const geocoder1 = new AMap.Geocoder()
                    const mpCenter = AMap
                    if (!geocoder) { // 不然会有无限循环渲染问题
                      setGeocoder(geocoder1)
                    }
                  }
                }
              }}
            >
              {/* <Geolocation
                enableHighAccuracy={true}
                timeout={10000}
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
    </>

  )
}

export default connect(
  ({
    ListSearchTable1
  }: {
    ListSearchTable1: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({

  })
)(AMapC)
