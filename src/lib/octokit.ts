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

import * as Octokit from '@octokit/rest'
import * as _ from 'lodash'
const octokitAPI = new Octokit({
  auth:'bfca67b14e5168b758ba9e5d0ad271f8f4520c72',
  log: {
    error: console.error,
    warn: console.warn,
  },
})

const OCTOKIT_USERNAME = 'octokit'
// let latestUpdatedOctokitRepos
// let latestOpenPRs
// let allCommitMessages

// number, string, and boolean

export async function fetchGitInfo(orgName:string) {
  const latestRepos = await getRepos(OCTOKIT_USERNAME, 'updated', 1, 1)
  const latestOpenPRs = await latestRepos.map(async (repo)=>{
    const latestPullRequests = await getPullRequests(OCTOKIT_USERNAME, repo.name, 'open', 1, 1)
    return latestPullRequests
  })

  const commitMessages = await latestOpenPRs.map(async (pullRequest)=> {
    // const prNumber = pullRequest.number
    const prNumber = _.get(pullRequest, 'number', null)
    // const prRepo = pullRequest.head.repo.name
    const prRepo = _.get(pullRequest, 'pullRequest.head.repo.name', null)
    const allCommitMessages = await getCommits(OCTOKIT_USERNAME, prNumber, prRepo)
    return allCommitMessages
  })

  Promise.all(commitMessages).then((completed) => {
    console.log('COMPLETED')
    console.log(completed)
  });
}

async function getRepos(username, sort, perPage, page) {
  const repoResponse = await octokitAPI.repos.listForUser({
    username,
    sort,
    page,
    per_page: perPage,
  })
  // return repoResponse.data
  return _.get(repoResponse, 'data', null)
}

async function getPullRequests(owner:string, repo:string, state?: "open" | "closed" | "all", perPage?:number, page?:number) {
  const pullRequestResponse = await octokitAPI.pulls.list({
    owner,
    repo,
    state,
    page,
    per_page: perPage,
  })
  // return pullRequestResponse.data
  return _.get(pullRequestResponse, 'data', null)
}

async function getPullRequestsAll(owner:string, repo:string,) {
  const pullRequestResponse = await octokitAPI.pulls.list({
    owner,
    repo,
  })
  // return pullRequestResponse.data
  return _.get(pullRequestResponse, 'data', null)
}

async function getCommits(owner, pullNumber, repo) {
  const commitsResponse = await octokitAPI.pulls.listCommits({
    owner,
    repo,
    pull_number: pullNumber,
  })
  // return commitsResponse.data
  return _.get(commitsResponse, 'data', null)
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
