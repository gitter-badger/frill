/**
 * Authentication strategy for Facebook
 * @see https://developers.facebook.com/
 */
const facebookStrategy = (server) => {
  server.auth.strategy('facebook', 'bell', {
    provider: 'facebook',
    password: 'cookie_encryption_password',
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    isSecure: false, // set this to true on HTTPS
  });
};

export default facebookStrategy;
