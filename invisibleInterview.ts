const axios = require('axios');

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)
})

const args = process.argv.slice(2);

// const inputs = ['New York', 'Santa Barbara', 'Portland', 90405]
const inputs = ['New York']

async function getWeather(location) {
  try {
     let res = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
       params: {
         q: location,
         APPID: '253e1dbbf0342d7e278b02a28f23a002'
       }
     });
     return res.data.weather[0].description
 } catch (error) {
   console.log('error get weather');
   console.log(error);
  throw new Error('Something awful happend');
 }
}

async function getLatLong(location) {
  try {
     // let res = await axios.get('https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=YOUR_API_KEY', {
       let res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
       params: {
         address: location,
         key: 'AIzaSyDfuUQEUeXnZz2y12iSr0s-Pf-5uXQv3i0'
       }
     });
     console.log('res.data');
     console.log(res.data);
     console.log('res.data.address_components');
     console.log(res.data.results[0].address_components);
     console.log('res.data.types');
     console.log(res.data.results[0].types);
     console.log('res.data.results[0].geometry');
     console.log(res.data.results[0].geometry);
     return res.data.results[0].geometry;
 } catch (error) {
   console.log('error getlatlong');
   console.log(error);
     throw new Error('Something awful happend');
 }
}

// https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810,-119.6822510&timestamp=1331766000&key=YOUR_API_KEY


async function getTime(location) {
  let res = await getLatLong(location);
  console.log('log RESRESRESRES');
  console.log(res);
  let lat = res.location.lat
  let lng = res.location.lng
  let locationString = lat+','+lng
  console.log('locationString');
  console.log(locationString);
  // let timestamp = (Math.round((new Date().getTime())/1000)).toString()
  var targetDate = new Date() // Current date/time of user computer
var timestamp = targetDate.getTime()/1000 + targetDate.getTimezoneOffset() * 60
  console.log('timestamp');
  console.log(timestamp);
  try {
    // https://maps.googleapis.com/maps/api/timezone/outputFormat?parameters
    // https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=YOUR_API_KEY

     // let res = await axios.get('https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=YOUR_API_KEY', {

       let res = await axios.get('https://maps.googleapis.com/maps/api/timezone/json', {
       params: {
         location: locationString,
         timestamp: timestamp,
         key: 'AIzaSyDfuUQEUeXnZz2y12iSr0s-Pf-5uXQv3i0'
       }
     });
     console.log('res.data');
     console.log(res.data);
     // console.log(res.data.results[0].geometry);
    //  var offsets = output.dstOffset * 1000 + output.rawOffset * 1000 // get DST and time zone offsets in milliseconds
    // var localdate = new Date(timestamp * 1000 + offsets) // Date object containing current time of Tokyo (timestamp + dstOffset + rawOffset)
    //   console.log(localdate.toLocaleString()) // Display current Tokyo date and time

      var offsets = res.data.dstOffset * 1000 + res.data.rawOffset * 1000
      // get DST and time zone offsets in milliseconds
     var localdate = new Date(timestamp * 1000 + offsets)
     // Date object containing current time of Tokyo (timestamp + dstOffset + rawOffset)
     console.log('localdate.toLocaleString()')
       console.log(localdate.toLocaleString())
       // Display current Tokyo date and time

     return res.data;
 } catch (error) {
   console.log('error gettime');
   console.log(error);
     throw new Error('Something awful happend');
 }
}

function getWeatherAndTime(locations){
  try {
    locations.forEach(async(location)=>{
        // console.log('Current time is { }');
        // console.log('in' + location)
        let time = await getTime(location)
        console.log('time')
        console.log(time)
        let weather = await getWeather(location)
        console.log(`Current time is {} in ${location} and the weather is super as ${weather}`)
        return weather
    })
  } catch(e){
    console.log('logging')
  }
};

getWeatherAndTime(inputs)
