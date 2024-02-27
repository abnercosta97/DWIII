import mongoose from "mongoose";
const { Schema } = mongoose;

const SpentSchema = new Schema({
  description: { type: String, maxlength: 30, required: true },
  value: { type: Number, required: true }
  });
  // define o schema
  const UserSchema = new Schema({
  mail: { type: String, maxLength: 50, required: true },
  password: { type: String, minlength: 6, maxlength: 10, select: false, required: true },
  spents: [SpentSchema]
  });
  
// mongoose.model compila o modelo
const User = mongoose.model("User", UserSchema);
const Spent = mongoose.model("Spent", SpentSchema);

export { User, Spent };
