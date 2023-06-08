import mongoose from "mongoose";

const burritoVariantSchema = new mongoose.Schema({
  _id: { type: String, unique: true },
  size: String,
  price: Number,
});

const burritoSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String, required: true, unique: true },
  description: { type: String },
  variants: [burritoVariantSchema],
  options: [String],
});

const Burrito = mongoose.model("Burrito", burritoSchema);

interface IBurritoVariant {
  _id: string;
  size: string;
  price: number;
}
interface IBurrito {
  _id: string;
  name: string;
  description?: string;
  variants: Array<IBurritoVariant>;
  options?: Array<string>;
}
type BurritoOrderInfo = IBurritoVariant & { name: string };

export { Burrito, IBurrito, IBurritoVariant, BurritoOrderInfo };
