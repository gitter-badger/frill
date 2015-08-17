import Joi from 'joi';
import Holiday from '../../helpers/RestApi';

/**
 * REST API - posts
 */
const posts = (server, Models) => {
  const {mysql} = Models;

  const PostApi = new Holiday('sequelize', 'posts', mysql.Posts);

  // TODO: write relations here for example
  PostApi.has('test', (Model, response, done) => {
    done(null, {test: 'test'});
  });

  PostApi.validate.save({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });

  PostApi.validate.update({
    title: Joi.string(),
    content: Joi.string(),
  });

  return PostApi.all();
};

export default posts;
