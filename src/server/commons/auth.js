const cookie = require('cookie');

const IS_PRODUCTION = process.env.NETLIFY_DEV === 'false';

exports.create = (token) => {
  const thirtyDays = 30 * 24 * 60 * 60;
  const newCookie = cookie.serialize('ghAccessToken', token, {
    secure: IS_PRODUCTION,
    httpOnly: true,
    sameSite: true,
    maxAge: thirtyDays,
  });
  return newCookie;
};

exports.check = (event) => {
  const cookies = event.headers.cookie && cookie.parse(event.headers.cookie);
  return cookies ? !!cookies.ghAccessToken : false;
};

exports.getToken = (event) => {
  const cookies = event.headers.cookie && cookie.parse(event.headers.cookie);
  return cookies ? cookies.ghAccessToken : false;
};
