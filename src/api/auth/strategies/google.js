import config from 'config';
/**
 * Authentication strategy for Google
 * @see https://developers.google.com/
 */
const googleStrategy = (server) => {
  server.auth.strategy('google', 'bell', {
    provider: 'google',
    password: config.get('starategies.google.password'),
    clientId: config.get('starategies.google.clientId'),
    clientSecret: config.get('starategies.google.clientSecret'),
    isSecure: config.get('starategies.google.isSecure'),
  });
};

export default googleStrategy;
