import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Nome é obrigatório"],
  },
});

const Model = mongoose.model("Category", CategorySchema, "categories");

export default Model;
