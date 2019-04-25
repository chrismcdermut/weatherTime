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
var _this = this;
exports.__esModule = true;
var chai_1 = require("chai");
require("mocha");
var google_client_1 = require("../client/google-client");
var open_weather_client_1 = require("../client/open-weather-client");
var validation_1 = require("../util/validation");
var log_weather_time_1 = require("../log-weather-time");
describe('Weather function', function () {
    it('should return weather as string', function () { return __awaiter(_this, void 0, void 0, function () {
        var testLocation, debug, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testLocation = 'New York';
                    debug = false;
                    return [4 /*yield*/, open_weather_client_1.openWeatherClient.getWeather(testLocation, debug)];
                case 1:
                    result = _a.sent();
                    chai_1.expect(result).to.be.a('string');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('getTime function', function () {
    it('should return time as string', function () { return __awaiter(_this, void 0, void 0, function () {
        var testLocation, debug, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testLocation = 'New York';
                    debug = false;
                    return [4 /*yield*/, google_client_1.googleClient.getTime(testLocation, debug)];
                case 1:
                    result = _a.sent();
                    chai_1.expect(result).to.be.a('string');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('fetchCoordinates function', function () {
    it('should return latLong as an object with lat, lng keys', function () { return __awaiter(_this, void 0, void 0, function () {
        var testLocation, debug, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testLocation = 'Portland';
                    debug = false;
                    return [4 /*yield*/, google_client_1.googleClient.fetchCoordinates(testLocation, debug)];
                case 1:
                    result = _a.sent();
                    chai_1.expect(result).to.be.an('object').and.to.include.keys('lat', 'lng');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('formTimeWeatherString function', function () {
    it('should return a string', function () { return __awaiter(_this, void 0, void 0, function () {
        var testInput, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testInput = 'Santa Monica';
                    return [4 /*yield*/, log_weather_time_1.formTimeWeatherString(testInput)];
                case 1:
                    result = _a.sent();
                    chai_1.expect(result).to.be.a('string');
                    return [2 /*return*/];
            }
        });
    }); });
});
// describe('logWeatherAndTime function', () => {
//
// it('should return log as an array', async () => {
//   const testInput = ['false', 'Santa Monica']
//   const result = await logWeatherAndTime(testInput)
//   expect(result).to.be.an('array')
// })
//
// })
describe('validateArguments function', function () {
    it('should not throw error with true or false as first argument', function () {
        var testLocation = ['false', 'New York'];
        var debug = false;
        chai_1.expect(function () { validation_1.validateArguments(testLocation, debug); }).to.not["throw"]();
    });
});
