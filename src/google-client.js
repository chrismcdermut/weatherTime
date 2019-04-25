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
var geoCodeURL = 'https://maps.googleapis.com/maps/api/geocode/json';
var timeURL = 'https://maps.googleapis.com/maps/api/timezone/json';
var constants_1 = require("../config/constants");
exports.googleClient = {
    fetchCoordinates: function (location, debug) {
        return __awaiter(this, void 0, void 0, function () {
            var params, res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            address: location,
                            key: constants_1.G_A_K
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1["default"].get(geoCodeURL, { params: params })];
                    case 2:
                        res = _a.sent();
                        if (res.status !== constants_1.SUCCESS_CODE) {
                            throw new Error('Error from Google maps for location ' + location + '. Status: ' + res.status);
                        }
                        else {
                            return [2 /*return*/, _.get(res, 'data.results[0].geometry.location', 'undetermined')];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error in getLatLong for " + location + " and the error is" + error_1);
                        if (debug) {
                            console.error(error_1);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    getTime: function (location, debug) {
        return __awaiter(this, void 0, void 0, function () {
            var timestamp, _a, lat, lng, locationString, params, res, dstOffset, rawOffset, offsets, localDate, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        timestamp = moment().unix();
                        return [4 /*yield*/, this.fetchCoordinates(location)];
                    case 1:
                        _a = _b.sent(), lat = _a.lat, lng = _a.lng;
                        locationString = lat + ',' + lng;
                        params = {
                            key: constants_1.G_A_K,
                            location: locationString,
                            timestamp: timestamp
                        };
                        return [4 /*yield*/, axios_1["default"].get(timeURL, { params: params })];
                    case 2:
                        res = _b.sent();
                        if (res.status !== constants_1.SUCCESS_CODE) {
                            throw new Error('Error from getTime for location ' + location + ' Error is ' + res.status);
                        }
                        else {
                            dstOffset = _.get(res, 'res.data.dstOffset', 0);
                            rawOffset = _.get(res, 'res.data.rawOffset', 0);
                            offsets = dstOffset * 1000 + rawOffset * 1000;
                            localDate = new Date(timestamp * 1000 + offsets);
                            return [2 /*return*/, localDate.toLocaleString()];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        console.error('Error in getTime' + error_2);
                        if (debug) {
                            console.error(error_2);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
};
