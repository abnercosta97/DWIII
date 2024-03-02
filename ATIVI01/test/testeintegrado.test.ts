import request from "superagent";
import routes from "../src/routes";

describe('Teste Integrado', () => {
    it("Teste Integrado", async () => {
        const response = request.get("/previsao/canas");
    });
});
