import Sequelize from 'sequelize';

/**
 * Users model
 * @see http://docs.sequelizejs.com/en/latest/docs/models-definition/#definition
 */
const users = (sequelize) => {
  return sequelize.define('users', {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE,
  });
};

export default users;
