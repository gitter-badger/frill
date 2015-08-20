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
  /** @see {AmazonWebServices} http://aws.amazon.com/ */
  AWS: {
    accessKeyId: 'myKeyId',
    secretAccessKey: 'secretKey',
    region: 'us-east-1',
  },
  strategies: {
    jwt: {
      secretKey: 'NeverShareYourSecret',
      algorithms: ['HS256'],
    },
    facebook: {
      password: 'cookie_encryption_password',
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
      isSecure: false,
    },
    github: {
      password: 'cookie_encryption_password',
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
      isSecure: false,
    },
    google: {
      password: 'cookie_encryption_password',
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
      isSecure: false,
    },
    twitter: {
      password: 'cookie_encryption_password',
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
      isSecure: false,
    },
  },
  /** server configurations  */
  server: {
    port: 3000,
    cache: {
      name: 'redis',
      host: '127.0.0.1',
      // partition: 'cache',
    },
    session: {
      maxCookieSize: 0,
      cookieOptions: {
        password: 'SOME_PASSWORD', /** @todo send options to a config */
        isSecure: false, /** @todo cannot do this at production */
      },
    },
    swagger: {
      path: 'http://localhost:3000',
    },
    logging: {
      level: null,
      options: {
        format: '[[]HH:mm:ss[]][[frill]]',
        utc: false,
      },
    },
  },
};
