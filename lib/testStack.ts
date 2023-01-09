import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { TestService } from './testService';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class TestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new TestService(this, 'Orders');
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'TestQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
