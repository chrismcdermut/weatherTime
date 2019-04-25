import axios from 'axios'
import * as _ from 'lodash'
import * as moment from 'moment'
const geoCodeURL = 'https://maps.googleapis.com/maps/api/geocode/json'
const timeURL = 'https://maps.googleapis.com/maps/api/timezone/json'
import { G_A_K, SUCCESS_CODE } from '../config/constants'

export const googleClient = {
  fetchCoordinates: async function(location: string | number, debug: boolean) {
    const params = {
      address: location,
      key: G_A_K,
    }
    try {
      const res = await axios.get(geoCodeURL, {params})
        if(res.status !== SUCCESS_CODE){
          throw new Error('Error from Google maps for location ' + location + '. Status: ' + res.status);
        } else {
          return _.get(res, 'data.results[0].geometry.location', 'undetermined')
        }
    } catch (error) {
      console.error(`Error in getLatLong for ${location} and the error is` + error)
      if (debug) { console.error(error) }
    }
 },
 getTime: async function(location: string | number, debug: boolean) {
   try {
     const timestamp = moment().unix()
     const {lat, lng} = await this.fetchCoordinates(location)
     const locationString: string = lat + ',' + lng
     const params = {
       key: G_A_K,
       location: locationString,
       timestamp,
     }
     const res = await axios.get(timeURL, {params})
       if(res.status !== SUCCESS_CODE){
         throw new Error('Error from getTime for location ' + location + ' Error is ' + res.status);
       } else {
         const dstOffset = _.get(res, 'res.data.dstOffset', 0)
         const rawOffset = _.get(res, 'res.data.rawOffset', 0)
         const offsets = dstOffset * 1000 + rawOffset * 1000
         const localDate = new Date(timestamp * 1000 + offsets)
         return localDate.toLocaleString()
       }
  } catch (error) {
     console.error('Error in getTime' + error)
     if (debug) { console.error(error) }
  }
},
}
