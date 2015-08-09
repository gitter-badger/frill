import Sequelize from 'sequelize';

/**
 * setup sequelize
 * @external {Sequelize} http://docs.sequelizejs.com/en/latest/
 */
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  // pool: {
  //   max: 5,
  //   min: 0,
  //   idle: 10000,
  // },
});

export default sequelize;
