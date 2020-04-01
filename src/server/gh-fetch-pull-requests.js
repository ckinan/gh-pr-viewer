const auth = require('./commons/auth');
const graphqlRequest = require('graphql-request');
const { GraphQLClient } = graphqlRequest;
const endpoint = 'https://api.github.com/graphql';

exports.handler = async function(event) {
  console.log(`Is token valid? ${auth.check(event)}`);

  try {
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${auth.getToken(event)}`,
      },
    });
    const response = await graphQLClient.request(query);
    const data = await response.viewer.pullRequests.nodes;

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
  viewer {
    pullRequests(first: 100) {
      nodes {
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
          owner {
            url
            login
          }
        }
      }
    }
  }
}`;
