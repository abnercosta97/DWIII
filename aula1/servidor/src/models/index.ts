import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema({
    mail:{
        type: String
    },
    password:{
        type: String
    }
});

const User = mongoose.model("User", UserSchema);

export {User};