"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var _ = require("lodash");
var moment = require("moment");
var OWM_APPID = '253e1dbbf0342d7e278b02a28f23a002';
var GOOGLE_API_KEY = 'AIzaSyDfuUQEUeXnZz2y12iSr0s-Pf-5uXQv3i0';
var argv = require('yargs').argv;
var debug = String(process.argv.slice(2, 3)).toLowerCase() === 'true' ? true : false;
// viewing command line arguments
if (debug) {
    process.argv.forEach(function (val, index) {
        console.log(index + ": " + val);
    });
}
// handling Undhandled Promise Rejections here
process.on('unhandledRejection', function (reason, p) {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
});
// sample inputs
// const input = ['New York', 'Santa Barbara', 'Portland', 90405]
// const input = ['New York', 10005, 'Tokyo', 'Sao', 'São Paulo', 'Pluto']
// const input = ['New York']
var input = process.argv.slice(2);
if (debug) {
    console.log('logging input');
    console.log(input);
}
function getWeather(location) {
    return __awaiter(this, void 0, void 0, function () {
        var res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get('http://api.openweathermap.org/data/2.5/weather', {
                            params: {
                                APPID: OWM_APPID,
                                q: location
                            }
                        })];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, _.get(res, 'data.weather[0].description', 'undetermined')];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error in getWeather for " + location + " and the error is" + error_1);
                    if (debug) {
                        console.error(error_1);
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getWeather = getWeather;
function getLatLong(location) {
    return __awaiter(this, void 0, void 0, function () {
        var res, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get('https://maps.googleapis.com/maps/api/geocode/json', {
                            params: {
                                address: location,
                                key: GOOGLE_API_KEY
                            }
                        })];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, _.get(res, 'data.results[0].geometry.location', 'undetermined')];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error in getLatLong for " + location + " and the error is" + error_2);
                    if (debug) {
                        console.error(error_2);
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getLatLong = getLatLong;
function getTime(location) {
    return __awaiter(this, void 0, void 0, function () {
        var timestamp, _a, lat, lng, locationString, res, dstOffset, rawOffset, offsets, localDate, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    timestamp = moment().unix();
                    return [4 /*yield*/, getLatLong(location)];
                case 1:
                    _a = _b.sent(), lat = _a.lat, lng = _a.lng;
                    locationString = lat + ',' + lng;
                    return [4 /*yield*/, axios_1["default"].get('https://maps.googleapis.com/maps/api/timezone/json', {
                            params: {
                                key: GOOGLE_API_KEY,
                                location: locationString,
                                timestamp: timestamp
                            }
                        })];
                case 2:
                    res = _b.sent();
                    dstOffset = _.get(res, 'res.data.dstOffset', 0);
                    rawOffset = _.get(res, 'res.data.rawOffset', 0);
                    offsets = dstOffset * 1000 + rawOffset * 1000;
                    localDate = new Date(timestamp * 1000 + offsets);
                    return [2 /*return*/, localDate.toLocaleString()];
                case 3:
                    error_3 = _b.sent();
                    console.error('Error in getTime' + error_3);
                    if (debug) {
                        console.error(error_3);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getTime = getTime;
function validateArguments(args) {
    console.log('in vaidate argumetns');
    console.log(args);
    try {
        var firstArgument = String(args.slice(0, 1)).toLowerCase();
        if (firstArgument !== 'false' && firstArgument !== 'true') {
            throw new Error('First method argument must be \'true\' or \'false\' for \
      debug mode which expands logging and errors, first argument is:' + firstArgument);
        }
        var locations = args.slice(1);
        // locations.forEach((f)=>{
        //   if(location)
        // })
        return locations;
    }
    catch (error) {
        console.error('Error in validateArguments and the error is' + error);
        if (debug) {
            console.error(error);
        }
    }
}
exports.validateArguments = validateArguments;
function returnFullTimeWeatherString(location) {
    return __awaiter(this, void 0, void 0, function () {
        var time, weather, timeWeatherString;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getTime(location)];
                case 1:
                    time = _a.sent();
                    return [4 /*yield*/, getWeather(location)];
                case 2:
                    weather = _a.sent();
                    timeWeatherString = "Current time is " + time + " in " + location + " and the weather is " + weather;
                    console.log(timeWeatherString);
                    return [2 /*return*/, timeWeatherString];
            }
        });
    });
}
exports.returnFullTimeWeatherString = returnFullTimeWeatherString;
function logWeatherAndTime(args) {
    return __awaiter(this, void 0, void 0, function () {
        var results, locations, error_4;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('logging lkjblk');
                    console.log(args);
                    results = [];
                    locations = validateArguments(args);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.all(locations.map(function (location) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, returnFullTimeWeatherString(location)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); }))];
                case 2:
                    results = _a.sent();
                    return [2 /*return*/, results];
                case 3:
                    error_4 = _a.sent();
                    console.error('Error in logWeatherAndTime and the error is' + error_4);
                    if (debug) {
                        console.error(error_4);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.logWeatherAndTime = logWeatherAndTime;
function runLogWeatherAndTime() {
    return __awaiter(this, void 0, void 0, function () {
        var input;
        return __generator(this, function (_a) {
            console.log('argv');
            console.log(argv);
            console.log('argv[$0]');
            console.log(argv['$0']);
            console.log('argv[_]');
            console.log(argv['_']);
            input = [].concat(argv['$0'], argv['_']);
            console.log('input');
            console.log(input);
            logWeatherAndTime(input);
            return [2 /*return*/];
        });
    });
}
exports.runLogWeatherAndTime = runLogWeatherAndTime;
// logWeatherAndTime(input)