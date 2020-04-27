const { GraphQLClient } = require('graphql-request');
const endpoint = 'https://api.github.com/graphql';
const GITHUB_PAT = process.env.GITHUB_PAT;
const { AuthorizationError } = require('../commons/error-types');
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';

const fetch = require('node-fetch');

exports.fetchPullRequests = async function (
  user,
  searchType,
  paginationActionType,
  cursor,
  token
) {
  try {
    const bearer = GITHUB_PAT ? GITHUB_PAT : token;
    // TODO: Handle the case where the token is expired. Try this here: const bearer = 123;
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${bearer}`,
      },
    });

    let userQuery;
    if (searchType === 'involves-author') {
      userQuery = `involves:${user} -author:${user}`;
    } else {
      userQuery = `${searchType}:${user}`;
    }

    let paginationQuery = '';
    const pageCount = 10;
    if (paginationActionType === 'previous') {
      paginationQuery = `last:${pageCount}, before:"${cursor}"`;
    } else if (paginationActionType === 'next') {
      paginationQuery = `first:${pageCount}, after:"${cursor}"`;
    } else {
      paginationQuery = `first:${pageCount}`;
    }

    const response = await graphQLClient.request(
      queryFetchPullRequests
        .replace('<userQuery>', userQuery)
        .replace('<paginationQuery>', paginationQuery)
    );
    return response.search;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      throw new AuthorizationError();
    } else {
      throw new Error(err.message);
    }
  }
};

exports.fetchUser = async function (token) {
  try {
    if (!token && !GITHUB_PAT) {
      throw new AuthorizationError();
    }

    const bearer = GITHUB_PAT ? GITHUB_PAT : token;
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${bearer}`,
      },
    });

    const response = await graphQLClient.request(queryFetchUser);
    let data = await response.viewer;
    data.isLoginGhWebFlow = !GITHUB_PAT;
    console.log(data);
    return data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      throw new AuthorizationError();
    } else {
      throw new Error(err.message);
    }
  }
};

exports.oauthAccessToken = async function (code) {
  const params = new URLSearchParams();
  params.append('client_secret', GITHUB_CLIENT_SECRET);
  params.append('client_id', GITHUB_CLIENT_ID);
  params.append('code', code);

  try {
    const response = await fetch(GITHUB_ACCESS_TOKEN_URL, {
      method: 'POST',
      body: params,
      headers: { Accept: 'application/json' },
    });

    const data = await response.json();
    return data.access_token;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      throw new AuthorizationError();
    } else {
      throw new Error(err.message);
    }
  }
};

const queryFetchUser = `{
  viewer {
    login
    avatarUrl
    url
  }
}`;

// TODO: Investigate best pratices to build GraphQL queries. Definitely, doing "replace" of a string is not the best way...
const queryFetchPullRequests = `{
  __typename
  search(query: "<userQuery> is:open is:pr ", type: ISSUE, <paginationQuery>) {
    edges {
      node {
        ... on PullRequest {
          id
          title
          number
          url
          state
          updatedAt
          createdAt
          closedAt
          mergedAt
          repository {
            name
            url
            nameWithOwner
            owner {
              url
              login
            }
          }
          timelineItems(first: 100, itemTypes: [REVIEW_REQUESTED_EVENT, PULL_REQUEST_REVIEW, PULL_REQUEST_COMMIT, ISSUE_COMMENT]) {
            nodes {
              __typename
              ... on ReviewRequestedEvent {
                id
                actor {
                  login
                  avatarUrl
                }
                createdAt
                requestedReviewer {
                  ... on User {
                    id
                    email
                    login
                  }
                }
              }
              ... on PullRequestReview {
                id
                author {
                  login
                  avatarUrl
                }
                updatedAt
                state
              }
              ... on PullRequestCommit {
                id
                commit {
                  message
                  committedDate
                  abbreviatedOid
                  oid
                  author {
                    user {
                      login
                      avatarUrl
                    }
                    avatarUrl
                    name
                  }
                }
              }
              ... on IssueComment {
                id
                author {
                  login
                  avatarUrl
                }
                updatedAt
                url
              }
            }
          }
          author {
            login
          }
        }
      }
    }
    issueCount
    pageInfo {
      startCursor
      hasPreviousPage
      hasNextPage
      endCursor
    }
  }
}`;
