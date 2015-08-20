import config from 'config';
/**
 * Authentication strategy for Facebook
 * @see https://developers.facebook.com/
 */
const facebookStrategy = (server) => {
  server.auth.strategy('facebook', 'bell', {
    provider: 'facebook',
    password: config.get('strategies.facebook.password'),
    clientId: config.get('strategies.facebook.clientId'),
    clientSecret: config.get('strategies.facebook.clientSecret'),
    isSecure: config.get('strategies.facebook.isSecure'),
  });
};

export default facebookStrategy;
