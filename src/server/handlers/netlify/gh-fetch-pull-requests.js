const auth = require('../../commons/auth');
const GhApiClientService = require('../../services/gh-api-client-service');

exports.handler = async function (event) {
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
    return {
      statusCode: err.code ? err.code : 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
