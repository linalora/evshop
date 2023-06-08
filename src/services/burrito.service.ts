import {
  Burrito,
  BurritoOrderInfo,
  IBurrito,
  IBurritoVariant,
} from "../models/burrito";

export async function createBurrito(input: IBurrito) {
  if (!input) {
    throw new Error("Please provide the burrito information");
  }
  return Burrito.create(input);
}

export async function findBurritoById(id: string) {
  return Burrito.find({ _id: id });
}

export async function findBurritos() {
  return Burrito.find({});
}

export async function deleteAllBurritos() {
  return Burrito.deleteMany({});
}

export async function findBurritoItem(
  burrito_variant_id: string
): Promise<BurritoOrderInfo> {
  return new Promise(async (resolve, reject) => {
    const burrito = (await Burrito.findOne({
      "variants._id": burrito_variant_id,
    })) as IBurrito;
    if (!burrito) {
      reject("Not found");
    }
    const item = burrito?.variants.find(
      (variant) => variant._id == burrito_variant_id
    ) as IBurritoVariant;
    if (!item) {
      reject("Not found");
    }
    resolve({
      _id: item._id,
      size: item.size,
      price: item.price,
      name: burrito.name,
    } as BurritoOrderInfo);
  });
}
