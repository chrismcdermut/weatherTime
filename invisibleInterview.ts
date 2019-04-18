const axios = require('axios');

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)
})

const args = process.argv.slice(2)

async function getWeatherAndTime() {
  try {
     let res = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
       params: {
         q: 'new york',
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

getWeatherAndTime();
