import { v4 as uuidV4 } from "uuid";
import { BurritoOrderInfo } from "../models/burrito";
import { Order, IOrderItemInput, IOrderItem } from "../models/order";
import { findBurritoItem } from "./burrito.service";

export async function createOrder(items: Array<IOrderItemInput>) {
  if (!items.length) {
    throw new Error("Please provide the order items");
  }

  const itemsVariantInfo: BurritoOrderInfo[] = await Promise.all(
    items?.map(async (item) => findBurritoItem(item.burrito_variant_id))
  );

  const orderItems: IOrderItem[] = items.map((item) => {
    const variant = itemsVariantInfo.find(
      (v) => v._id == item.burrito_variant_id
    ) as BurritoOrderInfo;
    return {
      quantity: item.quantity > 0 ? item.quantity : 1,
      unit_price: variant.price as number,
      description: `${variant.name} - ${variant.size}`,
      variant_id: item.burrito_variant_id,
    };
  });
  const order = new Order({ _id: uuidV4(), items: orderItems });
  return order.save();
}

export async function findOrderById(id: string) {
  return Order.find({ _id: id });
}

export async function findOrders() {
  return Order.find({});
}

export async function deleteAllOrders() {
  return Order.deleteMany({});
}
