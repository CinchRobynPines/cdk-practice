import { DynamoDB } from "aws-sdk";
import { TableName } from "../utils/tableDetails";

export default async (event: any, context: any) => {
  const dynamo = new DynamoDB.DocumentClient();

  const params = {
    TableName: TableName,
  };

  try {
    const data = await dynamo.scan(params).promise();
    return {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, GET",
      },
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };
  } catch (err) {
    console.log("ERROR", err);
    return {
      statusCode: 500,
      error: err,
    };
  }
};
