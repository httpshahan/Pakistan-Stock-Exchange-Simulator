import React from 'react'
import Chart from '../Stock/Chart'

const Data = ({ symbol, ...props }) => {
  return (
    <div>
      <Chart symbol={symbol} {...props} />
    </div>
  )
}

export default Data