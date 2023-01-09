import { DynamoDB } from "aws-sdk";
import { TableName } from "../utils/tableDetails";

export default async (event: any, context: any) => {
  const dynamo = new DynamoDB.DocumentClient();

  const body = JSON.parse(event.body);
  const paramKey = event.pathParameters.id;

  const params = {
    TableName: TableName,
    Key: { id: paramKey },
    UpdateExpression: `SET Ordered_Items = :x`,
    ExpressionAttributeValues: {
      ":x": body.items,
    },
  };

  try {
    await dynamo.update(params).promise();
    return {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, PUT",
      },
      statusCode: 200,
      body: "Succesfully updated data",
    };
  } catch (err) {
    console.log("ERROR", err);
    return {
      statusCode: 500,
      error: err,
    };
  }
};
