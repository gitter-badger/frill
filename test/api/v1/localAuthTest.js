import localAuthApi from '../../../src/api/v1/localAuth';
import {routePrefixer} from '../../../src/helpers';
import {inject} from '../../frillHelper';

server.route(routePrefixer('/api/v1', localAuthApi));

describe('/api/v1/login', () => {
  describe('/', () => {
    it('should return 404 on GET request', () => {
      inject({ method: 'GET', url: '/api/v1/login'}).then((response) => {
        response.statusCode.should.equal(404);
      });
    });
    it('should return 400 on POST request without body', () => {
      inject({ method: 'POST', url: '/api/v1/login'}).then((response) => {
        response.statusCode.should.equal(400);
        response.result.error.should.equal('Bad Request');
      });
    });
    // it('should return 200 on POST request with a valid body', () => {
    //   inject({
    //     method: 'POST',
    //     url: '/api/v1/login',
    //     payload: {
    //       username: 'nanopx',
    //       password: 'hello',
    //     },
    //   }).then((response) => {
    //     response.statusCode.should.equal(400);
    //     response.result.error.should.equal('Bad Request');
    //     console.log(response.result);
    //   });
    // });
  });
});
