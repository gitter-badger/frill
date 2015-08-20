import config from 'config';
/**
 * Authentication strategy for GitHub
 * @see https://developer.github.com/
 */
const githubStrategy = (server) => {
  server.auth.strategy('github', 'bell', {
    provider: 'github',
    password: config.get('starategies.github.password'),
    clientId: config.get('starategies.github.clientId'),
    clientSecret: config.get('starategies.github.clientSecret'),
    isSecure: config.get('starategies.github.isSecure'),
  });
};

export default githubStrategy;
