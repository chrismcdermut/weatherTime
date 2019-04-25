import axios from 'axios'
import * as _ from 'lodash'
import * as moment from 'moment'
const OWM_APPID = '253e1dbbf0342d7e278b02a28f23a002'
const GOOGLE_API_KEY = 'AIzaSyDfuUQEUeXnZz2y12iSr0s-Pf-5uXQv3i0'
const argv = require('yargs').argv
const debug = String(process.argv.slice(2, 3)).toLowerCase() === 'true' ? true : false

// viewing command line arguments
if (debug) {
  process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`)
  })
}

// handling Undhandled Promise Rejections here
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason)
})

// sample inputs
// const input = ['New York', 'Santa Barbara', 'Portland', 90405]
// const input = ['New York', 10005, 'Tokyo', 'Sao', 'São Paulo', 'Pluto']
// const input = ['New York']
const input = process.argv.slice(2)
if (debug) {
  console.log('logging input')
  console.log(input)
}

export async function getWeather(location: string | number) {
  try {
      const res = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
          APPID: OWM_APPID,
          q: location,
        },
      })
      return _.get(res, 'data.weather[0].description', 'undetermined')
 } catch (error) {
    console.error(`Error in getWeather for ${location} and the error is` + error)
    if (debug) { console.error(error) }
 }
}

export async function getLatLong(location: string | number) {
  try {
        const res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: location,
          key: GOOGLE_API_KEY,
        },
      })
        return _.get(res, 'data.results[0].geometry.location', 'undetermined')
 } catch (error) {
    console.error(`Error in getLatLong for ${location} and the error is` + error)
    if (debug) { console.error(error) }
 }
}

export async function getTime(location: string | number) {
  try {
    const timestamp = moment().unix()
    const {lat, lng} = await getLatLong(location)
    const locationString: string = lat + ',' + lng
    const res = await axios.get('https://maps.googleapis.com/maps/api/timezone/json', {
      params: {
        key: GOOGLE_API_KEY,
        location: locationString,
        timestamp,
      },
      })
    const dstOffset = _.get(res, 'res.data.dstOffset', 0)
    const rawOffset = _.get(res, 'res.data.rawOffset', 0)
    const offsets = dstOffset * 1000 + rawOffset * 1000
    const localDate = new Date(timestamp * 1000 + offsets)

    return localDate.toLocaleString()
 } catch (error) {
    console.error('Error in getTime' + error)
    if (debug) { console.error(error) }
 }
}

export function validateArguments(args: Array<string | number>) {
  console.log('in vaidate argumetns');
  console.log(args);
  try {
    const firstArgument: string = String(args.slice(0, 1)).toLowerCase()
    if (firstArgument !== 'false' && firstArgument !== 'true') {
      throw new Error('First method argument must be \'true\' or \'false\' for \
      debug mode which expands logging and errors, first argument is:' + firstArgument)
    }
    const locations = args.slice(1)
    // locations.forEach((f)=>{
    //   if(location)
    // })
    return locations
  } catch (error) {
    console.error('Error in validateArguments and the error is' + error)
    if (debug) { console.error(error) }
  }
}

export async function returnFullTimeWeatherString(location: string | number) {
    const time = await getTime(location)
    const weather = await getWeather(location)
    const timeWeatherString = `Current time is ${time} in ${location} and the weather is ${weather}`
    console.log(timeWeatherString)
    return timeWeatherString
  }

export async function logWeatherAndTime(args: Array<string | number>) {
  console.log('logging lkjblk')
  console.log(args)
  let results = []
  const locations = validateArguments(args)
  try {
    results = await Promise.all(locations.map(async (location) =>
      await returnFullTimeWeatherString(location),
    ))
    return results
  } catch (error) {
    console.error('Error in logWeatherAndTime and the error is' + error)
    if (debug) { console.error(error) }
  }
}

export async function runLogWeatherAndTime(){
  const firstArgument = _.get(argv, '$0', 'false')
  const locationArguments = _.get(argv, '_', 'pluto')
  const input = [].concat(firstArgument,locationArguments)
  logWeatherAndTime(input)
}

// logWeatherAndTime(input)
