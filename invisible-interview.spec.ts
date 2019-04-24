import {
  getWeather,
  getTime,
  getLatLong,
  logWeatherAndTime,
  returnFullTimeWeatherString
} from './invisible-interview';
import { expect } from 'chai';
import 'mocha';

describe('Weather function', () => {

  it('should return weather as string', async () => {
    const testLocation = 'New York'
    const result = await getWeather(testLocation);
    expect(result).to.be.a('string');
  });

});

describe('Time function', () => {

it('should return time as string', async () => {
  const testLocation = 'New York'
  const result = await getTime(testLocation);
  expect(result).to.be.a('string');
});

});

describe('LatLong function', () => {

it('should return latLong as an object', async () => {
  const testLocation = 'Portland'
  const result = await getLatLong(testLocation);
  expect(result).to.be.an('object');
});

});

describe('returnFullTimeWeatherString function', () => {

it('should return a string', async () => {
  const testInput = 'Santa Monica'
  const result = await returnFullTimeWeatherString(testInput);
  expect(result).to.be.a('string');
});

});

describe('logWeatherAndTime function', () => {

it('should return log as an array', async () => {
  const testInput = ['false', 'Santa Monica'];
  const result = await logWeatherAndTime(testInput);
  expect(result).to.be.an('array');
});

// it('should require true or false as first argument', () => {
//   const testInput = ['false', 'New York'];
//   const result = logWeatherAndTime(testInput);
//   expect(result).to.be.an('array');
// });

// it('should throw Error without true or false as first argument', async () => {
//   const testLocation = ['New York'];
//   // const model = new logWeatherAndTime();
//   expect(await logWeatherAndTime(testLocation)).to.throw(new Error('First method argument must be \'true\' or \'false\' for debug mode which expands logging and errors'));
// });

// expect(model.get.bind(model, 'z')).to.throw('Property does not exist in model schema.');
// expect(model.get.bind(model, 'z')).to.throw(new Error('Property does not exist in model schema.'));

});
