// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import nock from 'nock'

export const getMockApi = () => {
  const mockApi = nock(process.env.REACT_APP_CURRENCY_SVC_URL as string)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .options(/.*/)
    .reply(200)

  return mockApi
}
