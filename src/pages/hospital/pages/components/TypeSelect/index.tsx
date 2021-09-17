import React, { useEffect, useState } from 'react'
import { Select, Cascader } from 'antd'
import { regionList } from '../../service'

interface TypeSelectProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const TypeSelect: React.FC<TypeSelectProps> = props => {
  const { value, ...attr } = props
  const optionLists:any = []

  const [options, setOptions] = useState(optionLists)

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions)
  }

  const loadData = (selectedOptions:any) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    regionList({ id: targetOption.id }).then((d) => {
      const arr = d.data.map((v:any) => {
        return { ...v, isLeaf: v.level === 3 }
      })
      targetOption.loading = false
      targetOption.children = arr
      setOptions([...options])
    })
  }

  useEffect(() => {
    regionList({ id: 1 }).then((d) => {
      const arr = d.data.map((v:object) => {
        return { ...v, isLeaf: false }
      })
      setOptions(arr)
    })
  }, [])

  return (
    <Cascader fieldNames={{ label: 'areaName', value: 'id', children: 'children' }} options={options} loadData={loadData} {...attr} placeholder={props.placeholder} changeOnSelect />
    // <Select value={value === '' ? undefined : value} {...attr} allowClear>
    //   <Select.Option value='header'>头部</Select.Option>
    //   <Select.Option value='footer'>底部</Select.Option>
    // </Select>
  )
}

export default TypeSelect
