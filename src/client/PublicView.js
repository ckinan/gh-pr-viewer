import React from 'react';

const LoginPage = () => {
  return (
    <div className="mx-auto my-3 p-1" style={{ maxWidth: '900px' }}>
      <div className="blankslate">
        <h3 className="mb-1">Welcome to Github Web Client</h3>
        <p>You need to login with your Github account to see your content.</p>
        <a
          href="https://github.com/login/oauth/authorize?scope=user:email,read:org&client_id=0f95382ee6992185ca65"
          className="btn btn-primary my-3"
        >
          Login
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
