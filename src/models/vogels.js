import vogels from 'vogels';
import {AWS} from './../helpers';

/**
 * setup vogels
 * @external {Vogels} https://github.com/ryanfitz/vogels
 */
vogels.dynamoDriver(new AWS.DynamoDB({
  endpoint: 'http://localhost:8000',
}));

export default vogels;
