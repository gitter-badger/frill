import JWT from 'jsonwebtoken';
import Boom from 'boom';
import aguid from 'aguid';

const authHandler = (request, reply) => {
  console.log(request.auth);

  // reply error when authentication fails
  if (!request.auth.isAuthenticated) {
    return reply(
      Boom.unauthorized('Authentication failed due to: ' +
        request.auth.error.message)
    );
  }

  // TODO create and set JWT into session
  const session = {
    valid: true,
    id: aguid(), // a random session id
    userId: request.auth.credentials.profile.id,
    exp: new Date().getTime() + 30 * 60 * 1000, // expires in 30 minutes time
  };

  // // create the session in Redis
  // redisClient.set(session.id, JSON.stringify(session));
  request.session.set(session.id, session);
  // sign the session as a JWT
  const token = JWT.sign(session, 'NeverShareYourSecret');
  console.log(token);
  request.session.flash('token', token);
  return reply.redirect('/');
};

const loginHandler = () => {

};

const registrationHandler = () => {

};

export default {
  authHandler,
  loginHandler,
  registrationHandler,
};
