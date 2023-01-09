import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import { aws_lambda_nodejs } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as iam from "aws-cdk-lib/aws-iam";
import { TableName } from "../utils/tableDetails";

export class TestService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const table = new dynamodb.Table(this, "Orders-Test", {
      tableName: TableName,
      readCapacity: 1,
      writeCapacity: 1,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
    });

    table.grantReadWriteData;

    const ordersHandler = new aws_lambda_nodejs.NodejsFunction(
      this,
      "OrdersHandlerGet",
      {
        runtime: lambda.Runtime.NODEJS_14_X,
        entry: "resources/orders.ts",
        handler: "main",
      }
    );

    const lambdaPolicy = new iam.PolicyStatement({
      actions: ["*"],
      resources: ["*"],
    });

    ordersHandler.addToRolePolicy(lambdaPolicy);

    const getOrdersIntegration = new apigateway.LambdaIntegration(
      ordersHandler,
      {
        requestTemplates: { "application/json": '{ "statusCode": "200" }' },
      }
    );
    const postOrdersIntegration = new apigateway.LambdaIntegration(
      ordersHandler,
      {
        requestTemplates: { "application/json": '{ "statusCode": "201" }' },
      }
    );
    const updateOrdersIntegration = new apigateway.LambdaIntegration(
      ordersHandler,
      {
        requestTemplates: { "application/json": '{ "statusCode": "200" }' },
      }
    );
    const deleteOrdersIntegration = new apigateway.LambdaIntegration(
      ordersHandler,
      {
        requestTemplates: { "application/json": '{ "statusCode": "204" }' },
      }
    );
    const api = new apigateway.RestApi(this, "OrdersApi", {
      restApiName: "OrdersService",
      description: "an orders service",
      defaultCorsPreflightOptions: {
        allowHeaders: ["Content-Type"],
        allowMethods: ["OPTIONS", "GET", "POST", "DELETE", "PUT"],
        allowCredentials: false,
        allowOrigins: ["*"],
      },
    });
    api.root.addMethod("GET", getOrdersIntegration);
    api.root.addMethod("POST", postOrdersIntegration);
    const idOrderAPI = api.root.addResource("{id}");
    idOrderAPI.addMethod("GET", getOrdersIntegration);
    idOrderAPI.addMethod("DELETE", deleteOrdersIntegration);
    idOrderAPI.addMethod("PUT", updateOrdersIntegration);

    /*api.addGatewayResponse('GatewayResponse', {
            type: ResponseType.UNAUTHORIZED,
            statusCode: '403',
            responseHeaders: {
              // Note the quoting around the header value:
              // https://blog.ilearnaws.com/2020/05/27/error-unable-to-put-integration-response-on-options-for-resource-at-path/
              'Access-Control-Allow-Origin': "'*'",
            },
          });*/
  }
}
