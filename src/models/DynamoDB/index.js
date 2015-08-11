import Vogels from '../vogels';
import posts from './Posts';

/**
 * List of all DynamoDB models
 * @see {@link Posts}
 */
const DynamoDBModels = {
  Posts: posts(Vogels),
};

export default DynamoDBModels;
