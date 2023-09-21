import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import ConversionList, { Conversion } from './components/ConversionList'
import { getConversions } from './services/currency-service'

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [conversions, setConversions] = useState<Conversion[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const fetchConversions = () => {
      getConversions()
        .then((conversions) => {
          setErrorMessage(null)
          setConversions(conversions)
          setIsLoading(false)
        })
        .catch(() => {
          setIsLoading(false)
          setErrorMessage('Error when trying to fetch conversions. Please, try again later')
        })
    }

    fetchConversions()

    const pollingInterval = setInterval(fetchConversions, 300000)

    return () => {
      clearInterval(pollingInterval)
    }
  }, [])

  return (
    <div>
      <Navbar />
      <div className='container'>
        <ConversionList
          isLoading={isLoading}
          errorMessage={errorMessage}
          conversions={conversions}
        />
      </div>
    </div>
  )
}

export default App
