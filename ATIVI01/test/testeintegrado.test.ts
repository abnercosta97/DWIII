import request from "supertest";

import app from "../src";

describe('Teste Integrado', () => {
    it("Teste Previsão", async () => {
        const response = await request(app).get("/previsao/canas");
        expect(response.body.nome).toBe("Canas");
    });

    it("Teste Previsão 7 dias", async () => {
        const response = await request(app).get("/previsao7/canas");
        expect(response.body.nome).toBe("Canas");
    });

    it("Teste Previsão Estendida", async () => {
        const response = await request(app).get("/estendida/canas");
        expect(response).toEqual(expect.stringContaining("<nome>Canas</nome>"));
    });
});
