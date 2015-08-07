/**
 * AmazonWebServices Helper
 */
import AWS from 'aws-sdk';

// const AWS = {};

AWS.config.update({
  accessKeyId: 'myKeyId',
  secretAccessKey: 'secretKey',
  region: 'us-east-1',
});

export default AWS;
