import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import getCep from "./service/cep";
dotenv.config();

const app: Express = express(); 
const PORT = process.env.PORT;
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});

app.get("/", async function(req:Request, res:Response){
    const {cep} = req.body;
    const resp = await getCep(cep);
    res.json(resp);
});

