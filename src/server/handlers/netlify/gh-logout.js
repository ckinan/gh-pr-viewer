const auth = require('./commons/auth');

exports.handler = async function (event) {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({}),
      headers: {
        Location: '/',
        'Set-Cookie': auth.clear(),
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
