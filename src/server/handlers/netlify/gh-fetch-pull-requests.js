const auth = require('./commons/auth');
const GhApiClientService = require('../../services/gh-api-client-service');

exports.handler = async function (event) {
  console.log(`Is token valid? ${auth.check(event)}`);
  const user = event.queryStringParameters.user;
  const searchType = event.queryStringParameters.searchType;
  const paginationActionType = event.queryStringParameters.paginationActionType;
  const cursor = event.queryStringParameters.cursor;

  try {
    const result = await GhApiClientService.fetchPullRequests(
      user,
      searchType,
      paginationActionType,
      cursor,
      auth.getToken(event)
    );
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
