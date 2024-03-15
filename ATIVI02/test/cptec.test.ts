import Cptec from "../src/services/Cptec";
import api from "../src/services/api";

jest.mock("../src/services/api", () => {
     return {
        get: jest.fn().mockResolvedValue({ data: "response data" }) 
    };
});

describe("Cptec", ()=> {
    let cptec: Cptec;

    beforeAll(()=>{
        cptec = new Cptec();
    })

    it("Lista cidades", async () => {
        const cidade: string = "Canas";
        await cptec.listaCidades(cidade);

        expect(api.get).toHaveBeenCalledWith(`/listaCidades?city=${cidade.toLocaleLowerCase()}`);
    })

    it("Previsao", async () => {
        const id: string = '1238';
        await cptec.previsao(id);

        expect(api.get).toHaveBeenCalledWith(`/cidade/${id}/previsao.xml`);
    })
})