import { DynamoDB } from "aws-sdk";
import { TableName } from "../utils/tableDetails";

export default async (event: any, context: any) => {
  const dynamo = new DynamoDB.DocumentClient();
  const paramKey: string = event.pathParameters.id;
  console.log(event);

  const params = {
    TableName: TableName,
    Key: { id: paramKey },
  };

  console.log("partition key: ", paramKey);

  try {
    const response = await dynamo.delete(params).promise();
    console.log("RETRIEVED RESPONSE: ", response);
    return {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, DELETE",
      },
      statusCode: 204,
    };
  } catch (err) {
    console.log("ERROR", err);
    return {
      statusCode: 500,
      error: err,
    };
  }
};
