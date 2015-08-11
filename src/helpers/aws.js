/**
 * AmazonWebServices Helper
 * WARNING: should NOT be required by client source
 */
import AWS from 'aws-sdk';
import config from 'config';

// configure AWS
AWS.config.update(config.get('AWS'));

export default AWS;
