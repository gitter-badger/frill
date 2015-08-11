import helloApi from '../../../src/api/v1/hello';
import {inject} from '../../frillHelper';
import {routePrefixer} from '../../../src/helpers';

server.route(routePrefixer('/api/v1', helloApi()));

describe('/api/v1/hello', () => {
  describe('/', () => {
    it('should return 200 on GET request', () => {
      inject({ method: 'GET', url: '/api/v1/hello'}).then((response) => {
        response.statusCode.should.equal(200);
      });
    });

    it('should return 404 on POST request', () => {
      inject({ method: 'POST', url: '/api/v1/hello'}).then((response) => {
        response.statusCode.should.equal(404);
      });
    });

    it('should return 404 on PUT request', () => {
      inject({ method: 'PUT', url: '/api/v1/hello'}).then((response) => {
        response.statusCode.should.equal(404);
      });
    });

    it('should return 404 on DELETE request', () => {
      inject({ method: 'DELETE', url: '/api/v1/hello'}).then((response) => {
        response.statusCode.should.equal(404);
      });
    });

    it('should return expected result', () => {
      inject({ method: 'GET', url: '/api/v1/hello'}).then((response) => {
        response.result.should.deep.equal({msg: 'api, hello'});
      });
    });
  });
  describe('/restricted', () => {
    it('should return 401 Unauthorized on GET request without token', () => {
      inject({ method: 'GET', url: '/api/v1/hello/restricted'})
      .then((response) => {
        response.statusCode.should.equal(401);
        response.result.error.should.equal('Unauthorized');
        response.result.message.should.equal('Missing auth token');
      });
    });
    it('should return 200 on GET request with token', () => {
      // inject({ method: 'GET', url: '/hello/restricted'}).then((response) => {
      //   response.statusCode.should.equal(401);
      //   response.result.error.should.equal('Unauthorized');
      //   response.result.message.should.equal('Missing auth token');
      // });
      // inject({ method: 'GET', url: '/hello/restricted'}).then((response) => {
      //   response.statusCode.should.equal(401);
      //   response.result.error.should.equal('Unauthorized');
      //   response.result.message.should.equal('Missing auth token');
      // });
    });
  });
});
