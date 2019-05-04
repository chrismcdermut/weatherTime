import { expect } from 'chai'
import 'mocha'
import { googleClient } from '../client/google-client'
import { openWeatherClient } from '../client/open-weather-client'
import {
  formTimeWeatherString,
  logWeatherAndTime,
} from '../lib/log-weather-time'
import { validateArguments } from '../util/validation'

describe('Weather function', () => {

  it('should return weather as string', async () => {
    const testLocation = 'New York'
    const debug = false
    const result = await openWeatherClient.getWeather(testLocation, debug)
    expect(result).to.be.a('string')
  })

})

describe('getTime function', () => {

it('should return time as string', async () => {
  const testLocation = 'New York'
  const debug = false
  const result = await googleClient.getTime(testLocation, debug)
  expect(result).to.be.a('string')
})

})

describe('fetchCoordinates function', () => {

it('should return latLong as an object with lat, lng keys', async () => {
  const testLocation = 'Portland'
  const debug = false
  const result = await googleClient.fetchCoordinates(testLocation, debug)
  expect(result).to.be.an('object').and.to.include.keys('lat', 'lng')
})

})

describe('formTimeWeatherString function', () => {

it('should return a string', async () => {
  const testInput = 'Santa Monica'
  const result = await formTimeWeatherString(testInput)
  expect(result).to.be.a('string')
})

})

// describe('logWeatherAndTime function', () => {
//
// it('should return log as an array', async () => {
//   const testInput = ['false', 'Santa Monica']
//   const result = await logWeatherAndTime(testInput)
//   expect(result).to.be.an('array')
// })
//
// })

describe('validateArguments function', () => {

it('should not throw error with true or false as first argument', () => {
  const testLocation = ['false', 'New York']
  const debug = false
  expect(() => {validateArguments(testLocation, debug)}).to.not.throw()
})

})
