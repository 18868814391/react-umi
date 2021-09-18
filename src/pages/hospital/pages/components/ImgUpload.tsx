import React, { useEffect, useState } from 'react'
import { message, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { getPresignedUrl, uploadFile } from '../service'

interface ImgUploadProps {

}

const ImgUpload: React.FC<ImgUploadProps> = props => {
  const params_static:any = {
    bucket: 'C',
    type: 'C-2',
    systemId: 4,
    isIm: 0,
    checkStatus: 0,
    introduction: '',
    url: '',
    size: 0
  }
  const imageUrls:any = ''
  const [imageUrl, setImageUrl] = useState(imageUrls)
  const loadings:any = false
  const [loading, setLoding] = useState(loadings)
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  const customRequest = async({ file }) => {
    console.log(file)
    const isLimit = file.size / 1024 / 1024 < 5
    if (!isLimit) return message.error(`单个文件大小不能超过 ${5}MB!`)
    const { size, type, name } = file
    try {
      // 调用‘获取minio接口参数’
      const { presignUrl, urlId } = await getMinioURL()
      const status = await uploadMinio(presignUrl, file)
      if (status === 200) {
        const params = {
          ...params_static,
          url: urlId,
          size: parseInt(size / 1024),
          introduction: type.split('/')[1]
        }

        // 调用‘minio标识上传至图片服务器’
        uploadFileServe(params, file)
      }
    } catch {

    }
  }
  const getMinioURL = () => {
    return new Promise((resolve, reject) => {
      getPresignedUrl({
        bucket: 'C' // 默认上传头像
      }).then(res => {
        const presignUrl = res.data
        const urlId = presignUrl.split('?')[0].split('/').pop() // 截取链接中的一段数字
        resolve({ presignUrl, urlId })
      }).catch(res => {
        reject(res)
      })
    })
  }

  // upload
  // 上传至minio服务器 fetch方法 => https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
  const uploadMinio = (presignUrl:any, file:any) => {
    return new Promise((resolve, reject) => {
      fetch(presignUrl, {
        method: 'PUT',
        body: file
      })
        .then(({ status }) => {
          resolve(status)
        })
        .catch(res => {
          reject(res)
        })
    })
  }
  // upload
  // minio标识上传至图片服务器
  const uploadFileServe = (params, file) => {
    uploadFile(params)
      .then(data => {
        const { resourceId, shareUrl } = data.data
        resourceId &&
        setImageUrl(shareUrl)
        // getBase64(file).then(res => {
        //   // state.fileList = [{ url: res }];
        // })
      })
      .catch(() => {
        message.error('上传失败')
      })
  }

  // upload
  // 图片base64转化
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }
  return (
    <>
      <Upload
        name='avatar'
        listType='picture-card'
        className='avatar-uploader'
        showUploadList={false}
        customRequest={customRequest}
      >
        {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </>
  )
}

export default ImgUpload
