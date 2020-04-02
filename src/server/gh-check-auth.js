const auth = require('./commons/auth');
const graphqlRequest = require('graphql-request');
const { GraphQLClient } = graphqlRequest;
const endpoint = 'https://api.github.com/graphql';

exports.handler = async function(event) {
  console.log(`Is token valid? ${auth.check(event)}`);

  try {
    if (!auth.check(event)) {
      return {
        statusCode: 403,
        body: JSON.stringify({}),
      };
    }
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${auth.getToken(event)}`,
      },
    });
    const response = await graphQLClient.request(query);
    const data = await response.viewer;

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 403,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};

const query = `{
  viewer {
    login
  }
}`;
