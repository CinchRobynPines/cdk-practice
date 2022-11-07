import postOrders from "./postOrders";
import getOrders from "./getOrders";

exports.main = async (event: any, context: any) => {
  console.log(event.httpMethod);
  switch (event.httpMethod) {
    case "POST": {
      return postOrders(event, context);
    }
    case "GET": {
      return getOrders(event, context);
    }
    default: {
      return {
        statusCode: 500,
        error: "Unknown Endpoint",
      };
    }
  }
};
