import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

@Injectable()
export class ConfigService {
  constructor(filePath: string) {
    dotenv.config({ path: filePath });
  }

  get(key: string): string {
    return process.env[key];
  }

  get dbDialect(): MysqlConnectionOptions['type'] {
    return this.get('DB_DIALECT') as MysqlConnectionOptions['type'];
  }

  isDevelopmentEnvironment() {
    return this.get('NODE_ENV') === 'development';
  }

  isProductionEnvironment() {
    return this.get('NODE_ENV') === 'production';
  }

  get awsInitConfig() {
    return {
      accessKeyId: this.get('AWS_ACCESS_KEY'),
      secretAccessKey: this.get('AWS_SECRET_KEY'),
      region: this.get('AWS_REGION'),
    };
  }

  get awsPipelineId() {
    return this.get('AWS_PIPELINE_ID');
  }

  get awsTranscriptionPresetId() {
    return this.get('AWS_PRESET_FOR_TRANSCRIPTION');
  }

  get awsS3Bucket() {
    return this.get('AWS_BUCKET');
  }

  get firebaseAwsSecretKey() {
    return this.get('FIREBASE_AWS_SECRET_KEY');
  }

  get firebaseAwsSecretName() {
    return this.get('FIREBASE_AWS_SECRET_NAME');
  }

  get firebaseFileName() {
    return this.get('FIREBASE_FILE_NAME');
  }

  get getSqsCommentCreationQueueUrl() {
    return this.get('AWS_SQS_COMMENT_CREATION_QUEUE');
  }

  get getSqsCommentReplyQueueUrl() {
    return this.get('AWS_SQS_COMMENT_REPLY_QUEUE');
  }

  get getSqsNewFollowerQueueUrl() {
    return this.get('AWS_SQS_NEW_FOLLOWER_QUEUE');
  }

  get getTimeToPollCommentCreationQueueInSeconds() {
    return this.get('TIME_TO_POLL_COMMENT_CREATION_QUEUE_IN_SECONDS');
  }

  get getTimeToPollCommentReplyQueueInSeconds() {
    return this.get('TIME_TO_POLL_COMMENT_REPLY_QUEUE_IN_SECONDS');
  }

  get getTimeToPollNewFollowerQueueInSeconds() {
    return this.get('TIME_TO_POLL_NEW_FOLLOWER_QUEUE_IN_SECONDS');
  }

  get getReceiversCommentCreationWaitTimeInSeconds() {
    return this.get('RECEIVERS_COMMENT_CREATION_WAIT_TIME_IN_SECONDS');
  }

  get getReceiversCommentCreationMaxNumberOfMessages() {
    return this.get('RECEIVERS_COMMENT_CREATION_MAX_NUMBER_OF_MESSAGES');
  }

  get getReceiversCommentReplyWaitTimeInSeconds() {
    return this.get('RECEIVERS_COMMENT_REPLY_WAIT_TIME_IN_SECONDS');
  }

  get getReceiversCommentReplyMaxNumberOfMessages() {
    return this.get('RECEIVERS_COMMENT_REPLY_MAX_NUMBER_OF_MESSAGES');
  }

  get getReceiversNewFollowerWaitTimeInSeconds() {
    return this.get('RECEIVERS_NEW_FOLLOWER_WAIT_TIME_IN_SECONDS');
  }

  get getReceiversNewFollowerMaxNumberOfMessages() {
    return this.get('RECEIVERS_NEW_FOLLOWER_MAX_NUMBER_OF_MESSAGES');
  }

  get apnKeyId() {
    return this.get('APN_KEY_ID');
  }

  get apnTeamId() {
    return this.get('APN_TEAM_ID');
  }

  get apnAwsSecretName() {
    return this.get('APN_AWS_SECRET_NAME');
  }

  get apnAwsSecretKey() {
    return this.get('APN_AWS_SECRET_KEY');
  }

  get apnFileName() {
    return this.get('APN_FILE_NAME');
  }
}
