import React from 'react'
import nock from 'nock'
import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { getMockApi } from './setupTests'

describe('Conversions App', () => {
  beforeAll(() => {
    nock.disableNetConnect()
  })

  afterAll(() => {
    nock.cleanAll()
    nock.restore()
  })

  test('renders conversions from api', async () => {
    const mockApi = getMockApi()
    mockApi.get('/conversions').reply(200, [
      { id: 2, from: 'USD', to: 'BRL', rate: 4.876, created_at: '2023-09-22T00:37:01.680Z' },
      { id: 1, from: 'USD', to: 'BRL', rate: 4.976, created_at: '2023-09-22T00:35:01.680Z' },
    ])

    render(<App />)

    await waitFor(() => expect(screen.getByText('4.876')).toBeInTheDocument())
    await waitFor(() => expect(screen.getByText('4.976')).toBeInTheDocument())
    await waitFor(() => expect(screen.getAllByText('USD')).toHaveLength(2))
    await waitFor(() => expect(screen.getAllByText('BRL')).toHaveLength(2))
  })

  test('renders loading message', async () => {
    const mockApi = getMockApi()
    mockApi.get('/conversions').reply(200, [
      { id: 2, from: 'USD', to: 'BRL', rate: 4.876, created_at: '2023-09-22T00:37:01.680Z' },
      { id: 1, from: 'USD', to: 'BRL', rate: 4.976, created_at: '2023-09-22T00:35:01.680Z' },
    ])

    render(<App />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
