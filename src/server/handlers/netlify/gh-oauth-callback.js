const auth = require('./commons/auth');
const GhApiClientService = require('./services/gh-api-client-service');

exports.handler = async function (event) {
  const code = event.queryStringParameters.code;
  try {
    const accessToken = await GhApiClientService.oauthAccessToken(code);
    return {
      statusCode: 302,
      body: JSON.stringify({}),
      headers: {
        Location: '/',
        'Set-Cookie': auth.create(accessToken),
        'Cache-Control': 'no-cache',
      },
    };
  } catch (err) {
    return {
      statusCode: err.code ? err.code : 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
