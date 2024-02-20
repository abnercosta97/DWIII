import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.listen(3001, function () {
  console.log(`Rodando na porta ${PORT}`);
});

app.use(routes);
//
