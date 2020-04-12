const auth = require('./commons/auth');
const graphqlRequest = require('graphql-request');
const { GraphQLClient } = graphqlRequest;
const endpoint = 'https://api.github.com/graphql';
const GITHUB_PAT = process.env.GITHUB_PAT;

exports.handler = async function (event) {
  console.log(`Is token valid? ${auth.check(event)}`);
  const user = event.queryStringParameters.user;
  const searchType = event.queryStringParameters.searchType;

  try {
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${GITHUB_PAT}`,
      },
    });
    const response = await graphQLClient.request(
      query.replace('<user>', user).replace('<searchType>', searchType)
    );
    const data = response.search.edges.map((edge) => {
      return edge.node;
    });
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};

const query = `{
  __typename
  search(query: "<searchType>:<user> is:open is:pr ", type: ISSUE, first: 100) {
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
                submittedAt
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
  }
}`;
