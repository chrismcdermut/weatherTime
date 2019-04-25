import axios from 'axios'
import * as _ from 'lodash'
import { OWM_AID, SUCCESS_CODE } from '../config/constants'
const openWeatherURL = 'http://api.openweathermap.org/data/2.5/weather'

export const openWeatherClient = {
  async getWeather(location: string | number, debug: boolean) {
    try {
      const params = {
        APPID: OWM_AID,
        q: location,
      }
      const res = await axios.get(openWeatherURL, {params})
      if (res.status !== SUCCESS_CODE ) {
        throw new Error('Error from Open Weather for location ' + location + '. Status: ' + res.status)
        }
      return _.get(res, 'data.weather[0].description', 'undetermined')
   } catch (error) {
      console.error(`Error in getWeather for ${location} and the error is` + error)
      if (debug) { console.error(error) }
   }
},
}
