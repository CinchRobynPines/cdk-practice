export default async (event: any, context: any) => {
  try {
    console.log("trying");
    return {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, GET",
      },
      statusCode: 200,
      body: "test",
    };
  } catch (err) {
    console.log("ERROR", err);
    return {
      statusCode: 500,
      error: err,
    };
  }
};
