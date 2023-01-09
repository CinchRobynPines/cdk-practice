import postOrders from "./postOrders";
import getOrders from "./getOrders";
import getOrder from "./getOrder";
import deleteOrder from "./deleteOrder";

exports.main = async (event: any, context: any) => {
  console.log(event.httpMethod);
  switch (event.httpMethod) {
    case "POST": {
      return postOrders(event, context);
    }
    case "GET": {
      console.log(event.params);
      if (event.params) {
        return getOrder(event, context);
      }
      return getOrders(event, context);
    }
    case "DELETE": {
      return deleteOrder(event, context);
    }
    default: {
      return {
        statusCode: 500,
        error: "Unknown Endpoint",
      };
    }
  }
};
