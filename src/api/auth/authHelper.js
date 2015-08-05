import JWT from 'jsonwebtoken';

const authHandler = (request, reply) => {
  // var session = {
  //   valid: true, // this will be set to false when the person logs out
  //   id: aguid(), // a random session id
  //   exp: new Date().getTime() + 30 * 60 * 1000 // expires in 30 minutes time
  // }
  // // create the session in Redis
  // redisClient.set(session.id, JSON.stringify(session));
  // // sign the session as a JWT
  // var token = JWT.sign(session, process.env.JWT_SECRET); // synchronous
  // console.log(token);

  console.log(request.auth);
  // console.log(request.auth.credentials.profile);
  if (!request.auth.isAuthenticated) {
    return reply(
      'Authentication failed due to: ' + request.auth.error.message
    );
  }
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
