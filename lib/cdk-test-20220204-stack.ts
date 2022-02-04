import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { join } from 'path'
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Role, ServicePrincipal, ManagedPolicy } from 'aws-cdk-lib/aws-iam';

export class CdkTest20220204Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const getYamamoriFuncRole = new Role(this, 'getYamamoriFuncRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com')
    })
    getYamamoriFuncRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'))

    //new Function(this, 'hogehoge', {
    //  handler: 'hoge.handler',
    //  runtime: Runtime.PYTHON_3_9,
    //  code: Code.fromAsset('/src/'),
    //})
    new lambda.Function(this, 'getYamamori', {
      runtime: lambda.Runtime.PYTHON_3_9,
      functionName: 'getYamamori',
      memorySize: 256,
      role: getYamamoriFuncRole,
      timeout: Duration.seconds(10),
      handler: 'yamamori-function.handler',
      environment: {
        'MY_NAME': 'YAMAMORI'
      },
      code: lambda.Code.fromAsset(join(__dirname, 'getYamamoriLambdaHandler/'))
    })
  }
}
