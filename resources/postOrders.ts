import { DynamoDB } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { TableName } from "../utils/tableDetails";

export default async (event: any, context: any) => {
  const dynamo = new DynamoDB.DocumentClient();

  const body = JSON.parse(event.body);

  const params = {
    TableName: TableName,
    Item: {
      id: uuidv4(),
      Customer_Name: body.customer_name,
      Items: body.items,
    },
  };

  try {
    await dynamo.put(params).promise();
    return {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
      },
      statusCode: 201,
      body: "Succesfully uploaded data",
    };
  } catch (err) {
    console.log("ERROR", err);
    return {
      statusCode: 500,
      error: err,
    };
  }
};
