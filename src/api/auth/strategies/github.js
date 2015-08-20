import config from 'config';
/**
 * Authentication strategy for GitHub
 * @see https://developer.github.com/
 */
const githubStrategy = (server) => {
  server.auth.strategy('github', 'bell', {
    provider: 'github',
    password: config.get('strategies.github.password'),
    clientId: config.get('strategies.github.clientId'),
    clientSecret: config.get('strategies.github.clientSecret'),
    isSecure: config.get('strategies.github.isSecure'),
  });
};

export default githubStrategy;
