const graphqlRequest = require('graphql-request');
const { GraphQLClient } = graphqlRequest;
const endpoint = 'https://api.github.com/graphql';
const GITHUB_PAT = process.env.GITHUB_PAT;

exports.fetchPullRequests = async function (
  user,
  searchType,
  paginationActionType,
  cursor,
  token
) {
  try {
    const bearer = GITHUB_PAT ? GITHUB_PAT : token;

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
    const pageCount = 3;
    if (paginationActionType === 'previous') {
      paginationQuery = `last:${pageCount}, before:"${cursor}"`;
    } else if (paginationActionType === 'next') {
      paginationQuery = `first:${pageCount}, after:"${cursor}"`;
    } else {
      paginationQuery = `first:${pageCount}`;
    }

    const response = await graphQLClient.request(
      query
        .replace('<userQuery>', userQuery)
        .replace('<paginationQuery>', paginationQuery)
    );
    return response.search;
  } catch (err) {
    throw new Error(err.message);
  }
};

// TODO: Investigate best pratices to build GraphQL queries. Definitely, doing "replace" of a string is not the best way...
const query = `{
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
