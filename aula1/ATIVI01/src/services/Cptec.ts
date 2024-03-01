import api from "./api";

export default class Cptec{
    async listaCidades(cidade:string){
        const {data} = await api.get(`/listaCidades?city=${cidade}`);
        return data;
    }

    async previsao(id:string){
        const {data} = await api.get(`/cidade/${id}/previsao.xml`);
        return data;
    }

    async previsao7dias(id:string){
        const {data} = await api.get(`/cidade/7dias/${id}/previsao.xml`);
        return data;
    }

    async previsaoEstendida(id:string){
        const {data} = await api.get(`/cidade/${id}/estendida.xml`);
        return data;
    }
}
