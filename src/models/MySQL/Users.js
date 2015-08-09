import Sequelize from 'sequelize';
import sequelize from '../sequelize';

/**
 * Users model
 * @see http://docs.sequelizejs.com/en/latest/docs/models-definition/#definition
 */
const Users = sequelize.define('User', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE,
});

export default Users;
