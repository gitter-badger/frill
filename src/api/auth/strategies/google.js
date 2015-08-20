import config from 'config';
/**
 * Authentication strategy for Google
 * @see https://developers.google.com/
 */
const googleStrategy = (server) => {
  server.auth.strategy('google', 'bell', {
    provider: 'google',
    password: config.get('strategies.google.password'),
    clientId: config.get('strategies.google.clientId'),
    clientSecret: config.get('strategies.google.clientSecret'),
    isSecure: config.get('strategies.google.isSecure'),
  });
};

export default googleStrategy;
