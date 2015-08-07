/**
 * Example for using multiple type of databases
 */
// example for DynamoDB using vogels
import {Posts} from './DynamoDB';
// example for MySQL using sequelize
import {Users} from './MySQL';

const dynamoDb = {
  Posts,
};

const mySql = {
  Users,
};

const Models = {
  dynamoDb,
  mySql,
};

export default Models;
