# GetWeatherAndTime

  GetWeatherAndTime is a typescript method to retrieve the current weather and time for each location in an array of geographies

## Installation

```bash
npm install -g typescript
npm install -g ts-node
npm install
```

## Usage

  To run the method with arguments using npm
```bash
npm run logWeatherTime -- portland 90405 'New York' 'Tokyo' 'Lisbon' 'Portland' 'Santa Barbara' 'Santa Monica' 'Nashville' 'San luis obispo' 'bali' 'jakarta' 'singapore' 'vientianne' 'kyoto' 'shanghai'

npm run debugWeatherTime -- portlsdafand 90405 'New York' 'Sao Paolo' 'Lidddsbon'
```

  To run method by calling file directly, you will need to uncomment lines in log-weather-time.ts
```bash
ts-node log-weather-time.ts false portland 'new york' 90405 97239 'los angeles'
```

  To run unit tests on the method and its component functions
```bash
npm run test
```

  To lint file
```bash
tslint src/lib/log-weather-time.ts --fix

tslint src/test/log-weather-time.spec.ts --fix

tslint src/client/google-client.ts --fix

tslint src/client/open-weather-client.ts --fix
```

## Making changes
  Each time you make a change to the typescript file, you must run a command to generate an associated js file
```bash
tsc src/lib/log-weather-time.ts

tsc src/test/log-weather-time.spec.ts

tsc src/client/google-client.ts

tsc src/client/open-weather-client.ts
```

## Resources
https://www.typescriptlang.org/docs/tutorial.html
https://www.makeareadme.com/
https://www.chaijs.com/api/bdd/
https://palantir.github.io/tslint/rules/
https://openweathermap.org/api
https://developers.google.com/maps/documentation/timezone/intro
https://developers.google.com/maps/documentation/geocoding/intro

## Contributing
  Welcome to receive any review of best practices:
- Code consistency and naming conventions
- Use of reactive / functional paradigm
- Code abstraction
- Error Handling
- Testing
- Git committing
  Aiming to match Invisible's style: https://github.com/invisible-tech/guideline'

## Areas of Improvement
- Could add more tests, specifically one that checks for console out
- Need to take API keys out into their own file and ideally make secret / salted / hashed
- Need to add return types for client functions
- Add commitizen to make commits prettier
- Make linter run automatically on save

## License
[MIT](https: // choosealicense.com/licenses/mit/)
