import mongoose, { ObjectId, Schema } from "mongoose";
import Category from "./Category";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Nome é obrigatório"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: Category,
      required: [true, "Categoria é obrigatória"],
      validate: {
        validator: async function (_id: ObjectId) {
          const document = await mongoose.models.Category.findById(_id);
          return !!document;
        },
        message: "Categoria inexistente",
      },
    },
  },
  {
    toJSON: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Product = mongoose.model("Product", ProductSchema, "products");
export default Product;
