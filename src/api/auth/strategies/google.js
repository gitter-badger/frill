/**
 * Authentication strategy for Google
 * @see https://developers.google.com/
 */
const googleStrategy = (server) => {
  server.auth.strategy('google', 'bell', {
    provider: 'google',
    password: 'cookie_encryption_password',
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    isSecure: false,
  });
};

export default googleStrategy;
