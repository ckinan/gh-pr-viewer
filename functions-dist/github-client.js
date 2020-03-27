const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";

const fetch = require('node-fetch');
const cookie = require('cookie');

const IS_PRODUCTION = process.env.NETLIFY_DEV === 'false';

exports.handler = async function(event) {
  const code = event.queryStringParameters.code;
  const params = new URLSearchParams();
  params.append('client_secret', GITHUB_CLIENT_SECRET);
  params.append('client_id', GITHUB_CLIENT_ID);
  params.append('code', code);

  const cookies = event.headers.cookie && cookie.parse(event.headers.cookie)
  console.log(cookies.accessTokenGH);
  console.log(process.env);

  const thirtyDays = 30 * 24 * 60 * 60;
  const myCookie = cookie.serialize('my_cookie', 'lolHi', {
    secure: IS_PRODUCTION,
    httpOnly: true,
    sameSite: true,
    maxAge: thirtyDays,
  })

  try {
    const response = await fetch(GITHUB_ACCESS_TOKEN_URL, {
      method: 'POST',
      body: params,
      headers: { Accept: 'application/json' }
    });
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data }),
      'headers': {
        'Set-Cookie': myCookie
      }
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
