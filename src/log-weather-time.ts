import { argv } from 'yargs'
import * as _ from 'lodash'
import { googleClient } from './google-client.js'
import { openWeatherClient } from './open-weather-client.js'
let debug = String(process.argv.slice(2, 3)).toLowerCase() === 'true' ? true : false

export async function formTimeWeatherString(location: string | number) {
    const time = await googleClient.getTime(location, debug)
    const weather = await openWeatherClient.getWeather(location, debug)
    const timeWeatherString = `Current time is ${time} in ${location} and the weather is ${weather}`
    return timeWeatherString
  }

export async function logWeatherAndTime(debugMode: boolean = false) {
  const results = []
  const firstArgument = _.get(argv, '$0', 'false')
  const locationArguments = _.get(argv, '_', 'pluto')
  const locations = [].concat(firstArgument, locationArguments)
  debug = debugMode
  try {
    await Promise.all(locations.map(async (location) => {
      const weatherTimeString = await formTimeWeatherString(location)
      console.log(weatherTimeString)
      results.push(weatherTimeString)
    }))
    return results
  } catch (error) {
    console.error('Error in logWeatherAndTime and the error is' + error)
    if (debug) { console.error(error) }
  }
}

// Undhandled Promise Rejections caught here
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: ', p, 'reason: ', reason)
})

// Below section is for running file directly using ts-node
// uncomment last two commented lines: input from process.argv and logWeatherAndTime
// example(from project root): `ts-node src/log-weather-time.ts false portland
// 'new york' 90405 97239 'los angeles'`
// const input = ['New York', 10005, 'Tokyo', 'Sao', 'São Paulo', 'Pluto']
// const input = process.argv.slice(2)
// logWeatherAndTime(input)
