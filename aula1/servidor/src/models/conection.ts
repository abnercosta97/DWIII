import mongoose from "mongoose";

const uri = "mongodb://localhost:27017";

function conectar(){
    mongoose.connect(uri)
    .then(() => console.log('Connected!'));
}

export default conectar;