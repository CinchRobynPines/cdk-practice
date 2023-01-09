import postOrders from "./postOrders";
import getOrders from "./getOrders";
import getOrder from "./getOrder";
import deleteOrder from "./deleteOrder";
import updateOrder from "./update-Order";

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
    case "PUT": {
      return updateOrder(event, context);
    }
    default: {
      return {
        statusCode: 500,
        error: "Unknown Endpoint",
      };
    }
  }
};
