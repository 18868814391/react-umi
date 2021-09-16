import React, { useEffect } from 'react'
import styles from '../style.less'

interface Comp1Props {
  loading?: boolean;
  itemData?:any;
  createTime?:string;
  id?:string;
  studentName?:string;
  questionContent?:string;
  studentSex?:string;
  studentSchool?:string;
  studentAge?:number;
  studentGrade?:string;
}

const Comp1: React.FC<Comp1Props> = (props) => {
  const { createTime, id, studentName, questionContent, studentSex, studentSchool, studentAge, studentGrade } = props.itemData
  useEffect(() => {

  })
  return (
    <div className={styles.boxCon}>
      <div className={styles.tit}>
        <span>{studentName}</span>
        <span>{studentSex}</span>
        <span>{studentAge}岁</span>
        <span>{studentGrade}</span>
      </div>
      <div className={styles.con}>{questionContent}</div>
      <div className={styles.time}>{createTime}</div>
    </div>
  )
}

export default Comp1
