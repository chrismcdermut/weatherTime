"use strict";
/**
 * Pair:
 * For a given GitHub org name:
 * Fetch the last 3 updated repos
 * For each repo:
 * Fetch 5 latest open pull-requests
 * For each PR:
 * Fetch all commit messages
 * repo-name
 * PR #1334:
 *   commit 1
 *   commit 2
 *   commit 1
 * repo-name2
 * PR #13:
 *   commit 1
 *   commit 2
 *   commit 1
 */
// https://repl.it/@chrismcdermut/Chris-Test
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
var Octokit = require("@octokit/rest");
var octokitAPI = new Octokit({
    auth: 'bfca67b14e5168b758ba9e5d0ad271f8f4520c72',
    log: {
        error: console.error,
        warn: console.warn
    }
});
var OCTOKIT_USERNAME = 'octokit';
// let latestUpdatedOctokitRepos
// let latestOpenPRs
// let allCommitMessages
// number, string, and boolean
function fetchGitInfo(orgName) {
    return __awaiter(this, void 0, void 0, function () {
        var latestRepos, latestOpenPRs, commitMessages;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRepos(OCTOKIT_USERNAME, 'updated', 1, 1)
                    // console.log('latestRepos')
                    // console.log(latestRepos)
                ];
                case 1:
                    latestRepos = _a.sent();
                    return [4 /*yield*/, latestRepos.map(function (repo) { return __awaiter(_this, void 0, void 0, function () {
                            var latestPullRequests;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, getPullRequests(OCTOKIT_USERNAME, repo.name, 'open', 1, 1)];
                                    case 1:
                                        latestPullRequests = _a.sent();
                                        console.log('LATESTPULLREQUESTS');
                                        console.log(latestPullRequests);
                                        return [2 /*return*/, latestPullRequests
                                            // return await getPullRequests(OCTOKIT_USERNAME, repo.name, 5, 1)
                                        ];
                                }
                            });
                        }); })];
                case 2:
                    latestOpenPRs = _a.sent();
                    return [4 /*yield*/, latestOpenPRs.map(function (pullRequest) { return __awaiter(_this, void 0, void 0, function () {
                            var prNumber, prRepo, allCommitMessages;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        prNumber = pullRequest.number;
                                        prRepo = pullRequest.number.head.repo.name;
                                        return [4 /*yield*/, getCommits(OCTOKIT_USERNAME, prNumber, prRepo)];
                                    case 1:
                                        allCommitMessages = _a.sent();
                                        console.log('allCommitMessages');
                                        console.log(allCommitMessages);
                                        return [2 /*return*/, allCommitMessages
                                            // return 'null'
                                        ];
                                }
                            });
                        }); })];
                case 3:
                    commitMessages = _a.sent();
                    Promise.all(commitMessages).then(function (completed) {
                        console.log('sfsaf');
                        console.log(completed);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.fetchGitInfo = fetchGitInfo;
function getRepos(username, sort, perPage, page) {
    return __awaiter(this, void 0, void 0, function () {
        var repoResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, octokitAPI.repos.listForUser({
                        username: username,
                        sort: sort,
                        page: page,
                        per_page: perPage
                    })];
                case 1:
                    repoResponse = _a.sent();
                    return [2 /*return*/, repoResponse.data];
            }
        });
    });
}
function getPullRequests(owner, repo, state, perPage, page) {
    return __awaiter(this, void 0, void 0, function () {
        var pullRequestResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('owner');
                    console.log(owner);
                    console.log('repo');
                    console.log(repo);
                    return [4 /*yield*/, octokitAPI.pulls.list({
                            owner: owner,
                            repo: repo,
                            state: state,
                            page: page,
                            per_page: perPage
                        })];
                case 1:
                    pullRequestResponse = _a.sent();
                    console.log('PULLREQUESTRESPONSE');
                    console.log(pullRequestResponse);
                    console.log('PULLREQUESTRESPONSE.DATA[0].HEAD');
                    console.log(pullRequestResponse.data[0].head);
                    return [2 /*return*/, pullRequestResponse.data];
            }
        });
    });
}
function getPullRequestsAll(owner, repo) {
    return __awaiter(this, void 0, void 0, function () {
        var pullRequestResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('owner');
                    console.log(owner);
                    console.log('repo');
                    console.log(repo);
                    return [4 /*yield*/, octokitAPI.pulls.list({
                            owner: owner,
                            repo: repo
                        })];
                case 1:
                    pullRequestResponse = _a.sent();
                    console.log('pullRequestResponse');
                    console.log(pullRequestResponse);
                    console.log('pullRequestResponse.data');
                    console.log(pullRequestResponse.data);
                    return [2 /*return*/, pullRequestResponse.data];
            }
        });
    });
}
function getCommits(owner, pullNumber, repo) {
    return __awaiter(this, void 0, void 0, function () {
        var commitsResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, octokitAPI.pulls.listCommits({
                        owner: owner,
                        repo: repo,
                        pull_number: pullNumber
                    })];
                case 1:
                    commitsResponse = _a.sent();
                    return [2 /*return*/, commitsResponse.data];
            }
        });
    });
}
///////////////////////////////////////////////////////
// (async () => {
// console.log('saf')
// const { data: repos } = await getRepos(OCTOKIT_USERNAME, 'updated', 3, 1)
//   const { data: repos } = await octokit.repos.listForUser({
//   username: OCTOKIT_USERNAME,
//   sort: 'updated',
//   per_page: 3,
//   page: 1
// })
// console.log('{ data: repos }');
// console.log({ data: repos });
// console.log('{ data }');
// console.log({ data });
// })()
