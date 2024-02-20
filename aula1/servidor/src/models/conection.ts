import mongoose from "mongoose";

const uri = "mongodb://localhost:27017/aula1bd";

function conectar(){
    mongoose.connect(uri)
    .then(() => console.log('Connected!'));
}

export default conectar;