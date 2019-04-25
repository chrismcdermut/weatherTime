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
var yargs_1 = require("yargs");
var _ = require("lodash");
var google_client_js_1 = require("./google-client.js");
var open_weather_client_js_1 = require("./open-weather-client.js");
var debug = String(process.argv.slice(2, 3)).toLowerCase() === 'true' ? true : false;
function formTimeWeatherString(location) {
    return __awaiter(this, void 0, void 0, function () {
        var time, weather, timeWeatherString;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('debug');
                    console.log(debug);
                    return [4 /*yield*/, google_client_js_1.googleClient.getTime(location, debug)];
                case 1:
                    time = _a.sent();
                    return [4 /*yield*/, open_weather_client_js_1.openWeatherClient.getWeather(location, debug)];
                case 2:
                    weather = _a.sent();
                    timeWeatherString = "Current time is " + time + " in " + location + " and the weather is " + weather;
                    return [2 /*return*/, timeWeatherString];
            }
        });
    });
}
exports.formTimeWeatherString = formTimeWeatherString;
function logWeatherAndTime(debugMode) {
    if (debugMode === void 0) { debugMode = false; }
    return __awaiter(this, void 0, void 0, function () {
        var results, firstArgument, locationArguments, locations, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    results = [];
                    firstArgument = _.get(yargs_1.argv, '$0', 'false');
                    locationArguments = _.get(yargs_1.argv, '_', 'pluto');
                    locations = [].concat(firstArgument, locationArguments);
                    console.log('debugMode');
                    console.log(debugMode);
                    debug = debugMode;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.all(locations.map(function (location) { return __awaiter(_this, void 0, void 0, function () {
                            var weatherTimeString;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, formTimeWeatherString(location)];
                                    case 1:
                                        weatherTimeString = _a.sent();
                                        console.log(weatherTimeString);
                                        results.push(weatherTimeString);
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/, results];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error in logWeatherAndTime and the error is' + error_1);
                    if (debug) {
                        console.error(error_1);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.logWeatherAndTime = logWeatherAndTime;
// handling Undhandled Promise Rejections here
process.on('unhandledRejection', function (reason, p) {
    console.log('Unhandled Rejection at: ', p, 'reason: ', reason);
});
// Below section is for running file directly using ts-node
// uncomment last two commented lines: input from process.argv and logWeatherAndTime
// example(from project root): `ts-node src/log-weather-time.ts false portland
// 'new york' 90405 97239 'los angeles'`
// const input = ['New York', 10005, 'Tokyo', 'Sao', 'São Paulo', 'Pluto']
// const input = process.argv.slice(2)
// logWeatherAndTime(input)
