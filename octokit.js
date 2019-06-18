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

const Octokit = require('@octokit/rest')
// const octokit = Octokit({
//   log: {
//     debug: () => {},
//     info: () => {},
//     warn: console.warn,
//     error: console.error
//   }
// })

const OCTOKIT_USERNAME='octokit'

let latestUpdatedOctokitRepos
let latestOpenPRs;
let allCommitMessages;


// const octokit = Octokit({})
// const octokit = Octokit({

// })
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

// console.log('{ data: pullRequest }');
// console.log({ data: pullRequest });
console.log('saf')

// console.log('data');
// console.log(data);

// async function getRepos(userName, Sort, perPage, page ) {
//   return octokit.repos.listForUser({
//     username: userName,
//     sort: Sort,
//     per_page: perPage,
//     page: page
//   })
// }


// octokit.repos.listForUser({
//   username: OCTOKIT_USERNAME,
//   sort: 'updated',
//   per_page: 3,
//   page: 1
// }).then ((res)=>{
//    console.log('logging res');
//    console.log(res)
//    octokitRepos = res.data;
//    return res.data;
//  })

    // octokit.pulls.list({
    //   owner:OCTOKIT_USERNAME,
    //   repo: 'graphql.js',
    //   per_page: 5
    // }).then((res)=>{
    //   console.log('logging pulls');
    //   console.log(res)
    // })


// octokit.pulls.listCommits({
//   owner:OCTOKIT_USERNAME,
//   repo: 'graphql.js',
//   pull_number: 28
// }).then((res)=>{
//   console.log('logging commits');
//       console.log(res)
// })

// function getRepos(){

// }

// function getPullRequests(){

// }

// function getCommits(){

// }

//  then((repos)={
//    repos.forEach(repo=> {
//    octokit.pulls.list({
//     owner,
//     repo
//   })
//  })




//    octokit.pulls.list({
//     owner,
//     repo
//   })
//  })

//  octokitRepos.forEach(repo=> {
//    octokit.pulls.list({
//     owner,
//     repo
//   })
//  })

//  octokit.pulls.list({
//   owner,
//   repo
// })
