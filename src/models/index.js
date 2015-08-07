/**
 * Example for using multiple type of databases
 */
// example for DynamoDB using vogels
import {Posts} from './DynamoDB';
// example for MySQL using sequelize
import {Users} from './MySQL';

const ddb = {
  Posts,
};

const mysql = {
  Users,
};

export default {
  ddb,
  mysql,
};
