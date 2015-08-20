import config from 'config';
/**
 * Authentication strategy for Facebook
 * @see https://developers.facebook.com/
 */
const facebookStrategy = (server) => {
  server.auth.strategy('facebook', 'bell', {
    provider: 'facebook',
    password: config.get('starategies.facebook.password'),
    clientId: config.get('starategies.facebook.clientId'),
    clientSecret: config.get('starategies.facebook.clientSecret'),
    isSecure: config.get('starategies.facebook.isSecure'),
  });
};

export default facebookStrategy;
