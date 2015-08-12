import Joi from 'joi';
import Holiday from '../Holiday';

/**
 * REST API - posts
 */
const posts = (server, Models) => {
  const {mysql} = Models;

  Holiday.define('sequelize', {
    index: (Model, request, done) => {
      Model.findAll({
        offset: request.query.offset,
        limit: request.query.limit,
      })
      .then((records) => {
        done(null, records);
      })
      .catch((err) => {
        done(err, null);
      });
    },

    show: (Model, request, done) => {
      Model.findById(request.params.id)
      .then((records) => {
        done(null, records);
      })
      .catch((err) => {
        done(err, null);
      });
    },

    save: (Model, request, done) => {
      Model.create(request.payload).then((result) => {
        done(null, result);
      })
      .catch((err) => {
        done(err, null);
      });
    },

    update: (Model, request, done) => {
      Model.update(request.payload, {
        where: {
          id: request.params.id,
        },
      })
      .then((result) => {
        done(null, result);
      })
      .catch((err) => {
        done(err, null);
      });
    },

    destroy: (Model, request, done) => {
      Model.destroy({
        where: {
          id: request.params.id,
        },
      })
      .then((affected) => {
        done(null, affected);
      })
      .catch((err) => {
        done(err, null);
      });
    },
  });

  // Holiday.configure({
  //   tags: ['api'],
  // });

  const PostApi = new Holiday('sequelize', 'posts', mysql.Posts);

  PostApi.validate().save({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });

  PostApi.validate().update({
    title: Joi.string(),
    content: Joi.string(),
  });

  return PostApi.all();
};

export default posts;
