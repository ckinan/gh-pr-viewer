const auth = require('./commons/auth');
const graphqlRequest = require('graphql-request');
const { GraphQLClient } = graphqlRequest;
const endpoint = 'https://api.github.com/graphql';
const GITHUB_PAT = process.env.GITHUB_PAT;

// TODO: In general, all logic in server side should be in another layer, like 'services'.
//       And this should only be how I expose the service. Today is Netlify Functions, tomorrow can be Express.
exports.handler = async function (event) {
  console.log(`Is token valid? ${auth.check(event)}`);

  try {
    if (!auth.check(event) && !GITHUB_PAT) {
      return {
        statusCode: 403,
        body: JSON.stringify({}),
      };
    }

    const token = GITHUB_PAT ? GITHUB_PAT : auth.getToken(event);
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const response = await graphQLClient.request(query);
    let data = await response.viewer;
    data.isLoginGhWebFlow = !GITHUB_PAT;

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
    avatarUrl
    url
  }
}`;
