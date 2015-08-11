/**
 * Example for using multiple type of databases
 */
// example for MySQL using sequelize
import MySQLModels from './MySQL';
// example for DynamoDB using vogels
// import DynamoDBModels from './DynamoDB';

/**
 * List of all models
 * @see {@link MySQLModels}
 * @see {@link DynamoDBModels}
 */
const Models = {
  MySQLModels,
  // DynamoDBModels,
};

export default Models;
