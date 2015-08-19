import localAuthApi from '../../../src/api/auth/local';
import {routePrefixer} from '../../../src/helpers';
import {inject} from '../../baseHelper';

server.route(routePrefixer('/api', localAuthApi));

describe('/api/login', () => {
  describe('/', () => {
    it('should return 404 on GET request', () => {
      return inject({ method: 'GET', url: '/api/login' })
      .then((response) => {
        response.statusCode.should.equal(404);
      });
    });

    it('should return 404 on PUT request', () => {
      return inject({ method: 'PUT', url: '/api/login' })
      .then((response) => {
        response.statusCode.should.equal(404);
      });
    });

    it('should return 404 on DELETE request', () => {
      return inject({ method: 'DELETE', url: '/api/login' })
      .then((response) => {
        response.statusCode.should.equal(404);
      });
    });

    it('should return 400 on POST request without body', () => {
      return inject({ method: 'POST', url: '/api/login' })
      .then((response) => {
        response.statusCode.should.equal(400);
        response.result.error.should.equal('Bad Request');
      });
    });

    it('should return 400 on POST request with a invalid payload', () => {
      return inject({
        method: 'POST',
        url: '/api/login',
        payload: {
          username: 'nanopx',
          password: 'helllo',
        },
      }).then((response) => {
        response.statusCode.should.equal(400);
        response.result.error.should.equal('Bad Request');
        response.result.message.should.equal('invalid username or password');
      });
    });

    it('should return 200 on POST request with a valid payload', () => {
      return inject({
        method: 'POST',
        url: '/api/login',
        payload: {
          username: 'nanopx',
          password: 'hello',
        },
      }).then((response) => {
        response.statusCode.should.equal(200);
        response.result.token.should.exist;
        response.result.token.should.be.a('string');
      });
    });
  });
});
