import vogels from 'vogels';
import {AWS} from './../helpers';

// setup vogels
vogels.dynamoDriver(new AWS.DynamoDB({
  endpoint: 'http://localhost:8000'
}));

export default vogels;
