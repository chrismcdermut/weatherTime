const axios = require('axios');

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)
})

const args = process.argv.slice(2);

const inputs = ['New York', 'Santa Barbara', 'Portland', 90405]


async function getWeather(location) {
  try {
     let res = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
       params: {
         q: 'location',
         APPID: '253e1dbbf0342d7e278b02a28f23a002'
       }
     });
     // console.log('res.data');
     // console.log(res.data);
     return res.data.weather[0].description
 } catch (error) {
   console.log('error');
   console.log(error);
     throw new Error('Something awful happend');
 }

}

async function getTime() {
  try {
     let res = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
       params: {
         q: '90405,us',
         APPID: '253e1dbbf0342d7e278b02a28f23a002'
       }
     });
     console.log('res.data');
     console.log(res.data);
 } catch (error) {
   console.log('error');
   console.log(error);
     throw new Error('Something awful happend');
 }

}

function getWeatherAndTime(locations){
  try {
    locations.forEach(async(location)=>{
        // console.log('Current time is { }');
        console.log('in' + location)
        let weather = await getWeather(location)
        console.log('and the weather is super at ' + weather)
    })
  } catch(e){
    console.log('logging')
  }

};

getWeatherAndTime(inputs);
