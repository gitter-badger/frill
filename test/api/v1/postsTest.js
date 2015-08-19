import posts from '../../../src/api/v1/posts';
import {inject} from '../../frillHelper';
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
    // force sync sequelize before running tests
    sequelize.sync({force: true}).then(() => {
      Models.mysql.Posts.bulkCreate(testData);
    }).finally(done);
  });

  describe('GET /', () => {
    it('should return 200 on GET request', () => {
      return inject({ method: 'GET', url: '/api/v1/posts' })
      .then((response) => {
        response.statusCode.should.equal(200);
        console.log();
        // response.result.values.should.deep.equal(testData);
      });
    });
  });
});
