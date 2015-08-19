import Joi from 'joi';
import Holiday from '../../helpers/Holiday';

/**
 * REST API - posts
 */
const posts = (server, Models) => {
  const {mysql} = Models;

  const PostApi = new Holiday('sequelize', 'posts', mysql.Posts);

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
