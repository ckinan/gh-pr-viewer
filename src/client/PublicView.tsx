import React from 'react';

// TODO: Investigate how to handle the client_id with an environment variable if possible? Maybe at build time?
const LoginPage: React.FC = () => {
  return (
    <div className="mx-auto my-3 p-1" style={{ maxWidth: '900px' }}>
      <div className="blankslate">
        <h3 className="mb-1">Welcome to Github Pull Request Viewer</h3>
        <p>You need to login with your Github account to see your content.</p>
        <a
          href="https://github.com/login/oauth/authorize?scope=user:email,read:org&client_id=9ef2db5a41ff672e12c1"
          className="btn btn-primary my-3"
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
