import React from 'react'
import styles from './style.less'

interface historyPageProps {
  loading: boolean;
}

const HistoryPage: React.FC<historyPageProps> = props => {
  const {
    loading
  } = props

  return (
    <div className='indexlayout-main-conent'>
      historyPage
    </div>
  )
}

export default HistoryPage
