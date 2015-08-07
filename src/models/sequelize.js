import Sequelize from 'sequelize';

// setup sequelize
const sequelize = new Sequelize('database', 'username', 'password');

export default sequelize;
