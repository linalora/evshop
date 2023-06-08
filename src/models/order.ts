import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  quantity: { type: Number, default: 1, min: 1 },
  unit_price: { type: Number, required: true },
  description: { type: String },
  variant_id: { type: String },
});

const orderSchema = new mongoose.Schema({
  _id: { type: String },
  status: { type: String, default: "pending" },
  items: [orderItemSchema],
  total: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

interface IOrderItem {
  quantity: number;
  unit_price: number;
  description: string;
  variant_id: string;
}

interface IOrder {
  _id: string;
  items: Array<IOrderItem>;
  total: number;
  createdAt: Date;
}

interface IOrderItemInput {
  burrito_variant_id: string;
  quantity: number;
}

orderSchema.pre("save", function (next) {
  let total = 0;
  this.items.forEach((item) => (total += item.quantity * item.unit_price));
  this.total = total;
  next();
});

const Order = mongoose.model("Order", orderSchema);

export { Order, IOrder, IOrderItemInput, IOrderItem };
