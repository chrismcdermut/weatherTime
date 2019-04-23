const axios = require('axios')
const moment = require('moment')
const OWM_APPID = '253e1dbbf0342d7e278b02a28f23a002'
const GOOGLE_API_KEY = 'AIzaSyDfuUQEUeXnZz2y12iSr0s-Pf-5uXQv3i0'
let debug =  String(process.argv.slice(2,3)) === 'true' ? true : false;

//viewig command line arguments
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)
})

//handling Undhandled Promise Rejections here
process.on('unhandledRejection', (reason, p) => {
   console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

// const inputs = ['New York', 'Santa Barbara', 'Portland', 90405]
// const inputs = ['New York', 10005, 'Tokyo', 'Sao', 'São Paulo', 'Pluto']
// const inputs = ['New York']
const inputs = process.argv.slice(3);

async function getWeather(location) {
  try {
     let res = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
       params: {
         q: location,
         APPID: OWM_APPID
       }
     });
     const test = true
     console.log('test')
     console.log(test)
     if(test){
       console.log('asfdasf')
       throw new Error('SAFSAFSD')
     }
     return res.data.weather[0].description

 } catch (error) {
   console.error(`Error in getWeather for ${location} and the error is`+error);
   if(debug) console.error(error);
 }
}

async function getLatLong(location) {
  try {
       let res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
       params: {
         address: location,
         key: GOOGLE_API_KEY
       }
     });
     return res.data.results[0].geometry.location;
 } catch (error) {
   console.error(`Error in getLatLong for ${location} and the error is` + error);
   if(debug) console.error(error);
 }
}

async function getTime(location) {
  const timestamp = moment().unix();

  try {
    const {lat, lng} = await getLatLong(location);
    const locationString = lat+','+lng
    const res = await axios.get('https://maps.googleapis.com/maps/api/timezone/json', {
      params: {
        location: locationString,
        timestamp: timestamp,
        key: GOOGLE_API_KEY
      }
     });

    const offsets = res.data.dstOffset * 1000 + res.data.rawOffset * 1000
    const localDate = new Date(timestamp * 1000 + offsets)

    return localDate.toLocaleString();
 } catch (error) {
   console.error('Error in getTime' + error);
   if(debug) console.error(error);
 }
}

function getWeatherAndTime(locations){
  try {
    locations.forEach(async(location)=>{
        const time = await getTime(location)
        const weather = await getWeather(location)
        console.log(`Current time is ${time} in ${location} and the weather is ${weather}`);
    })
  } catch(error){
    console.error('Error in getWeatherAndTime and the error is' + error)
    if(debug) console.error(error)
  }
};

getWeatherAndTime(inputs)
