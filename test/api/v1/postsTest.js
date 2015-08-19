import posts from '../../../src/api/v1/posts';
import {inject, convertToPlainObject} from '../../baseHelper';
import {routePrefixer} from '../../../src/helpers';
import sequelize from '../../../src/models/setup_sequelize';
import Models from '../../../src/models';

server.route(routePrefixer('/api/v1', posts(server, Models)));

const testData = [
  {
    title: 'testOne',
    content: 'this is a content for testOne, for testing purpose',
  },
  {
    title: 'testTwo',
    content: 'this is a content for testTwo, for testing purpose',
  },
];

describe('/api/v1/posts', () => {
  before((done) => {
    if (process.env.NODE_ENV !== 'test') {
      done(
        new Error('Please set NODE_ENV to \'test\' to ensure your data will not'
          + ' be modified or deleted by tests.')
      );
    } else {
      // force sync sequelize before running tests
      sequelize.sync({force: true}).then(() => {
        Models.mysql.Posts.bulkCreate(testData);
      }).finally(done);
    }
  });

  after((done) => {
    if (process.env.NODE_ENV !== 'test') {
      done(
        new Error('Please set NODE_ENV to \'test\' to ensure your data will not'
          + ' be modified or deleted by tests.')
      );
    } else {
      // drop
      sequelize.drop({force: true}).finally(done);
    }
  });

  describe('GET /', () => {
    it('should return 200 and fetch results on GET request', () => {
      return inject({ method: 'GET', url: '/api/v1/posts' })
      .then((response) => {
        response.statusCode.should.equal(200);
        return convertToPlainObject(response.result).then((result) => {
          result.should.have.length(2);
        });
      });
    });
  });

  describe('GET /{id}', () => {
    it('should return 200 and fetch a result on GET request', () => {
      return inject({ method: 'GET', url: '/api/v1/posts/1' })
      .then((response) => {
        response.statusCode.should.equal(200);
        return convertToPlainObject(response.result).then((result) => {
          result.should.have.ownProperty('id');
          result.id.should.equal(1);
        });
      });
    });
  });

  describe('POST /', () => {
    it('should return 201 on POST request', () => {
      return inject({
        method: 'POST',
        url: '/api/v1/posts',
        payload: {
          title: 'a new test title',
          content: 'a new test content',
        },
      })
      .then((response) => {
        response.statusCode.should.equal(201);
      });
    });
    it('should have new record created', () => {
      return inject({
        method: 'GET',
        url: '/api/v1/posts/3',
      })
      .then((response) => {
        response.statusCode.should.equal(200);
        return convertToPlainObject(response.result).then((result) => {
          result.should.have.ownProperty('id');
          result.id.should.equal(3);
          result.should.have.ownProperty('title');
          result.title.should.equal('a new test title');
        });
      });
    });
  });

  describe('PUT /{id}', () => {
    it('should be able to modify record', () => {
      return inject({
        method: 'PUT',
        url: '/api/v1/posts/3',
        payload: {
          title: 'a new test title - modified',
        },
      })
      .then((response) => {
        response.statusCode.should.equal(200);
        return convertToPlainObject(response.result).then((result) => {
          result[0].should.equal(1); // rows affected
        });
      });
    });
    it('should have record modified', () => {
      return inject({
        method: 'GET',
        url: '/api/v1/posts/3',
      })
      .then((response) => {
        response.statusCode.should.equal(200);
        return convertToPlainObject(response.result).then((result) => {
          result.should.have.ownProperty('id');
          result.id.should.equal(3);
          result.should.have.ownProperty('title');
          result.title.should.equal('a new test title - modified');
        });
      });
    });
  });

  describe('DELETE /{id}', () => {
    it('should be able to delete record', () => {
      return inject({
        method: 'DELETE',
        url: '/api/v1/posts/3',
      })
      .then((response) => {
        response.statusCode.should.equal(204);
      });
    });
    it('should be deleted', () => {
      return inject({
        method: 'GET',
        url: '/api/v1/posts/3',
      })
      .then((response) => {
        response.statusCode.should.equal(404);
      });
    });
  });
});
