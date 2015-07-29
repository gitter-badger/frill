/**
 * Setup helpers to use from the 'api'
 */

import Joi from 'joi';
import {DynamoDB} from '../models';
import AWS from 'aws';

export default {
  Joi,
  AWS,
  DynamoDB
};
