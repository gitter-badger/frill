export default {
  app: 'Frill',
  /** @see {Sequelize} http://docs.sequelizejs.com/en/latest/ */
  sequelize: {
    database: 'database',
    username: 'username',
    password: 'password',
    options: {
      host: 'localhost',
      dialect: 'mysql',
      // pool: {
      //   max: 5,
      //   min: 0,
      //   idle: 10000,
      // },
    },
  },
  vogels: {
    endpoint: 'localhost:8000',
  },
  /** @see {AmazonWebServices} http://aws.amazon.com/ */
  AWS: {
    accessKeyId: 'myKeyId',
    secretAccessKey: 'secretKey',
    region: 'us-east-1',
  },
};
