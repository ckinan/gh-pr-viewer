const auth = require('./commons/auth');
const graphqlRequest = require('graphql-request');
const { GraphQLClient } = graphqlRequest;
const endpoint = 'https://api.github.com/graphql';

exports.handler = async function (event) {
  console.log(`Is token valid? ${auth.check(event)}`);

  try {
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${auth.getToken(event)}`,
      },
    });
    const response = await graphQLClient.request(query);
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
  search(query: "involves:ckinan is:pr is:open", type: ISSUE, first: 10) {
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
          timelineItems(first: 10, itemTypes: [REVIEW_REQUESTED_EVENT, PULL_REQUEST_REVIEW, PULL_REQUEST_COMMIT, ISSUE_COMMENT]) {
            nodes {
              __typename
              ... on ReviewRequestedEvent {
                id
                actor {
                  login
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
                }
              }
              ... on IssueComment {
                id
                author {
                  login
                }
                updatedAt
                url
              }
            }
          }
        }
      }
    }
  }
}`;
