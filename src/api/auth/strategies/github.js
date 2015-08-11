/**
 * Authentication strategy for GitHub
 * @see https://developer.github.com/
 */
const githubStrategy = (server) => {
  server.auth.strategy('github', 'bell', {
    provider: 'github',
    password: 'cookie_encryption_password',
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    isSecure: false, // set this to true on HTTPS
  });
};

export default githubStrategy;
