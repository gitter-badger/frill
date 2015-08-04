import vogels from '../vogels';
import Joi from 'Joi';

export default vogels.define('Post', {
  hashKey: 'email',
  rangeKey: 'title',
  schema: {
    email: Joi.string().email(),
    title: Joi.string(),
    content: Joi.binary(),
    tags: vogels.types.stringSet(),
  },
});
