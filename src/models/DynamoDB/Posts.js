import Vogels from '../vogels';
import Joi from 'Joi';

/**
 * Posts model
 * @see https://github.com/ryanfitz/vogels#define-a-model
 */
const Posts = Vogels.define('Post', {
  hashKey: 'email',
  rangeKey: 'title',
  schema: {
    email: Joi.string().email(),
    title: Joi.string(),
    content: Joi.binary(),
    tags: vogels.types.stringSet(),
  },
});

export default Posts;
