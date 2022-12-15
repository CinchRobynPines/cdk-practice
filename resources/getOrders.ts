import { DynamoDB } from "aws-sdk";

export default async (event: any, context: any) => {
  const dynamo = new DynamoDB.DocumentClient();

  const params = {
    TableName: "TestStack-OrdersOrdersTest24902276-1E0FNBYR5NK5G",
  };

  try {
    const data = await dynamo.scan(params).promise();
    console.log("RETRIEVED DATA: ", data);
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
