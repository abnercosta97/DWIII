import mongoose, { ObjectId, Schema } from "mongoose";
import User from "./User";
import Product from "./Product";

const SpentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: [true, "Usuário é obrigatório"],
      validate: {
        validator: async function (_id: ObjectId) {
          const document = await mongoose.models.User.findById(_id);
          return !!document;
        },
        message: "Usuário inexistente",
      },
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: Product,
      required: [true, "Produto é obrigatório"],
      validate: {
        validator: async function (_id: ObjectId) {
          const document = await mongoose.models.Product.findById(_id);
          return !!document;
        },
        message: "Produto inexistente",
      },
    },
    datetime: {
      type: Date,
      default: Date.now,
    },
    value: {
      type: Number,
      required: [true, "Valor é obrigatório"],
      min: [0, "Valor deve ser maior ou igual a 0"],
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

const Spent = mongoose.model("Spent", SpentSchema, "spents");
export default Spent;
