import React from 'react'
import Chart from '../Stock/Chart'

const Data = ({ symbol }) => {
  return (
    <div>
      <Chart symbol={symbol} />
    </div>
  )
}

export default Data