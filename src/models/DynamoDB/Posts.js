import vogels from '../vogels';
import Joi from 'Joi';

const Posts = vogels.define('Post', {
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
