import Cptec from "../src/services/Cptec";

describe('Cptec teste', () => {
    it("Cidade Válida", async () => {
        const r = await new Cptec().listaCidades("canas");
        expect(r).toEqual(expect.stringContaining("<nome>Canas</nome>"));
    });

    it("previsao", async () => {
        const r = await new Cptec().previsao("244");
        expect(r).toEqual(expect.stringContaining("<nome>S�o Paulo</nome>"));
    });

    it("previsao7dias", async () => {
        const r = await new Cptec().previsao7dias("244");
        expect(r).toEqual(expect.stringContaining("<nome>S�o Paulo</nome>"));
    });

    it("previsaoEstendida", async () => {
        const r = await new Cptec().previsaoEstendida("244");
        expect(r).toEqual(expect.stringContaining("<nome>S�o Paulo</nome>"));
    });
});
