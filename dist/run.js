"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var twitter_api_sdk_1 = require("twitter-api-sdk");
var node_fetch_1 = __importDefault(require("node-fetch"));
var BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAN9hdwEAAAAAT3kmTYqHKgggre1FKO7xSthqpMU%3DPQw8UO5w1mqt4bfJToTPtoI5TQeZ2DoJmPgLkBZVsJwYkrZYvA';
var client = new twitter_api_sdk_1.Client(BEARER_TOKEN);
function getTweet() {
    return __awaiter(this, void 0, void 0, function () {
        var tweet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.tweets.findTweetById('20001')];
                case 1:
                    tweet = _a.sent();
                    if (!tweet.data) {
                        console.log('empty :(');
                    }
                    else {
                        console.log(tweet.data.text);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
var inferTweetSentiment = function (tweets) { return __awaiter(void 0, void 0, void 0, function () {
    var response, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, node_fetch_1.default)('https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment', {
                        headers: {
                            Authorization: 'Bearer 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'
                        },
                        method: 'POST',
                        body: JSON.stringify({
                            inputs: tweets
                        })
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                return [2 /*return*/, Promise.reject(err_1)];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getRecentTweets = function (queryText, numPages) { return __awaiter(void 0, void 0, void 0, function () {
    var MAX_RESULTS_PER_PAGE, tweets, nextToken, i, resp, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                MAX_RESULTS_PER_PAGE = 100;
                tweets = [];
                nextToken = null;
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < numPages)) return [3 /*break*/, 6];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, client.tweets.tweetsRecentSearch({
                        query: queryText,
                        sort_order: 'relevancy',
                        max_results: MAX_RESULTS_PER_PAGE,
                        next_token: nextToken
                    })];
            case 3:
                resp = _a.sent();
                console.log({
                    num_tweets: resp.data.length,
                    next_token: resp.meta.next_token
                });
                nextToken = resp.meta.next_token;
                tweets = __spreadArray(__spreadArray([], tweets, true), resp.data, true);
                return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                console.log(err_2);
                return [3 /*break*/, 5];
            case 5:
                i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/, tweets];
        }
    });
}); };
// getRecentTweets('joe biden', 3)
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var tweets, tweetTexts, inferences, resultsAgg, _i, inferences_1, tweetScore, _a, tweetScore_1, labels;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getRecentTweets('putin', 3)];
                case 1:
                    tweets = _b.sent();
                    tweetTexts = tweets.map(function (tweet) { return tweet.text; });
                    return [4 /*yield*/, inferTweetSentiment(tweetTexts)];
                case 2:
                    inferences = _b.sent();
                    resultsAgg = {
                        LABEL_0: { label: 'negative', score: 0.0 },
                        LABEL_1: { label: 'neutral', score: 0.0 },
                        LABEL_2: { label: 'positive', score: 0.0 }
                    };
                    for (_i = 0, inferences_1 = inferences; _i < inferences_1.length; _i++) {
                        tweetScore = inferences_1[_i];
                        for (_a = 0, tweetScore_1 = tweetScore; _a < tweetScore_1.length; _a++) {
                            labels = tweetScore_1[_a];
                            resultsAgg[labels.label] = __assign(__assign({}, resultsAgg[labels.label]), { score: resultsAgg[labels.label].score + labels.score });
                        }
                    }
                    console.log("$number of tweets scored: " + inferences.length);
                    console.log(resultsAgg);
                    return [2 /*return*/];
            }
        });
    });
}
main();
