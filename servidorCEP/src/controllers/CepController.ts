/*import { Request, Response } from 'express'
import getCep from '../service/cep';

export async function cep(req:Request, res:Response){
    const {cep} = req.body;
    const resp = await getCep(cep);
    if(resp){
        res.json(resp);
    }else{
        res.status(404).json({error:"CEP não encontrado"});
    }
    res.send(resp);
}
*/