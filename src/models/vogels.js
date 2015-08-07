import vogels from 'vogels';
import {AWS} from './../helpers';

// setup vogels
Vogels.dynamoDriver(new AWS.DynamoDB({
  endpoint: 'http://localhost:8000',
}));

export default Vogels;
