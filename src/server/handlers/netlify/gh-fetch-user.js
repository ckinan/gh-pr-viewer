const auth = require('../../commons/auth');
const GhApiClientService = require('../../services/gh-api-client-service');

exports.handler = async function (event) {
  try {
    const result = await GhApiClientService.fetchUser(auth.getToken(event));
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
