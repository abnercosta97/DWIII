import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    mail: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "E-mail é obrigatório"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "E-mail inválido",
      ],
    },
    password: {
      type: String,
      trim: true,
      select: false,
      required: [true, "Senha é obrigatória"],
      minlength: [6, "Senha deve ter no mínimo 6 caracteres"],
      maxlength: [10, "Senha deve ter no máximo 10 caracteres"],
    },
    profile: {
      type: String,
      enum: ["user", "adm"],
      default: "user",
    },
  },
  {
    toJSON: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const User = mongoose.model("User", UserSchema, "users");
export default User;
