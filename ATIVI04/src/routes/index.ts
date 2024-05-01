import { Router } from "express";
import EstacaoController from "../controllers/EstacaoController";

const routes = Router();

routes.get("/estacao/lista", EstacaoController.lista);
// (A) http://localhost:3004/estacao/lista
routes.get("/estacao/leiturasporestacao", EstacaoController.leiturasPorEstacao);
// (B) http://localhost:3004/estacao/leiturasporestacao
routes.get(
  "/estacao/estatisticatemperatura/:nomeEstacao",
  EstacaoController.estatisticasTemperatura
);
// (C) http://localhost:3004/estacao/estatisticatemperatura/VITORIA
routes.get(
  "/estacao/estatistica/:nomeEstacao/:campo",
  EstacaoController.estatistica
);
// (D) http://localhost:3004/estacao/estatistica/VITORIA/umidadeRelativa e http://localhost:3004/estacao/estatistica/VITORIA/ventoVelocidade
routes.get(
  "/estacao/leituras/:nomeEstacao/:campo/:dataInicio/:dataFim",
  EstacaoController.leituras
);
// (E) http://localhost:3004/estacao/leituras/VITORIA/temperaturaAr/2024-01-02/2024-01-03
routes.get(
  "/estacao/estatistica/:nomeEstacao/:campo/:dataInicio/:dataFim",
  EstacaoController.estatisticaporestacao
);
// (F) http://localhost:3004/estacao/estatistica/VITORIA/temperaturaAr/2024-01-02/2024-01-03
routes.get(
  "/estacao/intervalo/:nomeEstacao/:dataInicio/:dataFim",
  EstacaoController.intervalo
);
// (G) http://localhost:3004/estacao/intervalo/VITORIA/2024-01-02/2024-01-03

export default routes;
