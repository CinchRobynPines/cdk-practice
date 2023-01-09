import { object, string, number, array } from "yup";

// checks price is a float
const digitsOnly = (value: string | undefined) => {
  if (value == undefined) {
    return false;
  } else return /^\d*[.{1}\d*]\d*$/.test(value);
};

export const itemSchema = object({
  item_name: string().max(50, "Please ensure item exists in stock").required(),
  quanitity: number()
    .max(10, "Customer can order a maximum of 10 of an item")
    .min(1, "Please add a quanitity")
    .required(),
  price_per_item: string()
    .required()
    .min(1, "Items must have a price")
    .test("inputEntry", "Price Per Item must be a number", digitsOnly),
});

export const inputItemsSchema = array().of(itemSchema).required();

export const inputOrderSchema = object({
    customer_name: string().min(1, "Customer Name must have Length").required("Please provide the customer's name"),
    items: inputItemsSchema.required("Order must contain items")
})
