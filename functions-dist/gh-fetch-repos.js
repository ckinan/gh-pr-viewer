const fetch = require('node-fetch');
const auth = require('./commons/auth');

exports.handler = async function(event) {
  console.log(`Is token valid? ${auth.check(event)}`);

  try {
    const response = await fetch('https://api.github.com/user/repos', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + auth.getToken(event) }
    });
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
