import React from 'react'
import './ConversionList.css'
import Conversion from './Conversion'

interface ConversionListProps {
  conversions: Conversion[]
  isLoading: boolean
  errorMessage: string | null
}

const ConversionList = ({ isLoading, errorMessage, conversions }: ConversionListProps) => {
  return (
    <div className='currency-container'>
      <div className='currency-row currency-header'>
        <div className='currency-cell'>From</div>
        <div className='currency-cell'>To</div>
        <div className='currency-cell'>Rate</div>
        <div className='currency-cell'>Date</div>
      </div>
      {isLoading && !errorMessage && <div className='loading-container'>Loading...</div>}

      {errorMessage && <div className='error-container'>{errorMessage}</div>}

      {!isLoading &&
        conversions.map((conversion) => (
          <div key={conversion.id} className='currency-row'>
            <div className='currency-cell'>{conversion.from}</div>
            <div className='currency-cell'>{conversion.to}</div>
            <div className='currency-cell'>{conversion.rate}</div>
            <div className='currency-cell'>Date</div>
          </div>
        ))}
    </div>
  )
}

export default ConversionList
