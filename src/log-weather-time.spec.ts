import { expect } from 'chai'
import 'mocha'
import {googleClient} from './google-client'
import {
  logWeatherAndTime,
  formTimeWeatherString,
  validateArguments,
} from './log-weather-time'
import {openWeatherClient} from './open-weather-client'

describe('Weather function', () => {

  it('should return weather as string', async () => {
    const testLocation = 'New York'
    const result = await openWeatherClient.getWeather(testLocation)
    expect(result).to.be.a('string')
  })

})

describe('getTime function', () => {

it('should return time as string', async () => {
  const testLocation = 'New York'
  const result = await googleClient.getTime(testLocation)
  expect(result).to.be.a('string')
})

})

describe('fetchCoordinates function', () => {

it('should return latLong as an object with lat, lng keys', async () => {
  const testLocation = 'Portland'
  const result = await googleClient.fetchCoordinates(testLocation)
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

describe('logWeatherAndTime function', () => {

it('should return log as an array', async () => {
  const testInput = ['false', 'Santa Monica']
  const result = await logWeatherAndTime(testInput)
  expect(result).to.be.an('array')
})

})

describe('validateArguments function', () => {

it('should not throw error with true or false as first argument', () => {
  const testLocation = ['false', 'New York']
  expect(() => {validateArguments(testLocation)}).to.not.throw()
})

// expect.to.throw is having issues
// it('should throw Error without true or false as first argument', () => {
//   const testLocation = ['New York']
//   console.log('LOGGING TYPE')
//   console.log(typeof validateArguments)
//   console.log(validateArguments)
//   expect(() => {validateArguments(testLocation)}).to.throw()
// })

})
