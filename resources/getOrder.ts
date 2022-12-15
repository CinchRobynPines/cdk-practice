import { DynamoDB } from "aws-sdk";

export default async (event: any, context: any) => {
  const dynamo = new DynamoDB.DocumentClient();
  console.log("EVENT: ", event, "CONTEXT: ", context);
  const paramKey = event.params;

  const params = {
    TableName: "TestStack-OrdersOrdersTest24902276-1E0FNBYR5NK5G",
    Key: {
      id: paramKey,
    },
  };

  try {
    const data = await dynamo.get(params).promise();
    console.log("RETRIEVED DATA: ", data);
    return {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, GET",
      },
      statusCode: 200,
      body: JSON.stringify(data.Item),
    };
  } catch (err) {
    console.log("ERROR", err);
    return {
      statusCode: 500,
      error: err,
    };
  }
};
