import { Request, Response } from "express";
import { EstacaoModel } from "../models/Estacao";
import { Estacao } from "../types";

class EstacaoController {
  // Insere um documento na coleção estacoes
  public async insert(estacao: Estacao): Promise<void> {
    try {
      const document = new EstacaoModel(estacao);
      await document.save(); // insere na coleção
    } catch (error: any) {
      console.log(estacao.estacao, error.message);
    }
  }

  // Retorna os campos uf, estacao, latitude e longitude de todas as estações, ordenadas pelo campo estacao
  public async lista(req: Request, res: Response): Promise<void> {
    try {
      const estacoes = await EstacaoModel.find(
        {},
        { uf: 1, estacao: 1, latitude: 1, longitude: 1, _id: 0 }
      ).sort({ estacao: 1 });
      res.json(estacoes);
    } catch (error) {
      console.error("Erro ao buscar as estações:", error);
      res.status(500).json({ message: "Erro ao buscar as estações." });
    }
  }

  // Retorna a quantidade de leituras por estação, ordenadas pelo campo estacao
  public async leiturasPorEstacao(req: Request, res: Response): Promise<void> {
    try {
      const resultado = await EstacaoModel.aggregate([
        {
          $project: {
            estacao: 1,
            quantidadeLeituras: { $size: "$leituras" }, // Obtém o tamanho do array "leituras"
          },
        },
        {
          $sort: { estacao: 1 }, // Ordena pelo campo estacao
        },
      ]);

      res.json(resultado);
    } catch (error) {
      console.error("Erro ao buscar as leituras por estação:", error);
      res
        .status(500)
        .json({ message: "Erro ao buscar as leituras por estação." });
    }
  }

  public async estatisticasTemperatura(
    req: Request,
    res: Response
  ): Promise<void> {
    const nomeEstacao = req.params.nomeEstacao;

    try {
      const resultado = await EstacaoModel.aggregate([
        {
          $match: { estacao: nomeEstacao }, // Filtra pela estação especificada na URL
        },
        {
          $unwind: "$leituras", // "Desconstrói" o array leituras em documentos individuais
        },
        {
          $group: {
            _id: "$estacao",
            mediaTemperatura: { $avg: "$leituras.temperaturaAr" }, // Calcula a média da temperatura
            minimaTemperatura: { $min: "$leituras.temperaturaAr" }, // Calcula o mínimo da temperatura
            maximaTemperatura: { $max: "$leituras.temperaturaAr" }, // Calcula o máximo da temperatura
          },
        },
        {
          $project: {
            _id: 0, // Não inclui o campo _id no resultado final
            estacao: "$_id",
            mediaTemperatura: 1,
            minimaTemperatura: 1,
            maximaTemperatura: 1,
          },
        },
      ]);

      res.json(resultado);
    } catch (error) {
      console.error("Erro ao buscar as estatísticas de temperatura:", error);
      res
        .status(500)
        .json({ message: "Erro ao buscar as estatísticas de temperatura." });
    }
  }

  // Retorna o valor médio, mínimo e máximo de um campo específico para uma estação
  public async estatistica(req: Request, res: Response): Promise<void> {
    const nomeEstacao = req.params.nomeEstacao;
    const campo = req.params.campo;

    try {
      const resultado = await EstacaoModel.aggregate([
        {
          $match: { estacao: nomeEstacao }, // Filtra pela estação especificada na URL
        },
        {
          $unwind: "$leituras", // "Desconstrói" o array leituras em documentos individuais
        },
        {
          $group: {
            _id: "$estacao",
            estacao: { $first: "$estacao" }, // Mantém a estacao no resultado final
            parametro: { $addToSet: { $literal: campo } }, // Adiciona o parâmetro como um valor literal
            valorMedio: { $avg: `$leituras.${campo}` }, // Calcula a média do campo fornecido
            valorMinimo: { $min: `$leituras.${campo}` }, // Calcula o mínimo do campo fornecido
            valorMaximo: { $max: `$leituras.${campo}` }, // Calcula o máximo do campo fornecido
          },
        },
        {
          $project: {
            _id: 0, // Não inclui o campo _id no resultado final
            estacao: 1, // Mantém a estacao no resultado final
            parametro: { $arrayElemAt: ["$parametro", 0] }, // Extrai o primeiro elemento do array parametro
            valorMedio: 1,
            valorMinimo: 1,
            valorMaximo: 1,
          },
        },
      ]);

      res.json(resultado);
    } catch (error) {
      console.error("Erro ao buscar as estatísticas:", error);
      res.status(500).json({ message: "Erro ao buscar as estatísticas." });
    }
  }

  // Retorna as leituras de um campo específico para uma estação no intervalo de datas fornecido
  public async leituras(req: Request, res: Response): Promise<void> {
    const nomeEstacao = req.params.nomeEstacao;
    const campo = req.params.campo;
    const dataInicio = new Date(req.params.dataInicio);
    const dataFim = new Date(req.params.dataFim);

    try {
      const resultado = await EstacaoModel.aggregate([
        {
          $match: { estacao: nomeEstacao }, // Filtra pela estação especificada na URL
        },
        {
          $unwind: "$leituras", // "Desconstrói" o array leituras em documentos individuais
        },
        {
          $match: {
            "leituras.datahora": {
              $gte: dataInicio, // Filtra as leituras a partir da data de início
              $lte: dataFim, // Filtra as leituras até a data de fim
            },
          },
        },
        {
          $group: {
            _id: "$estacao",
            leituras: {
              $push: {
                leitura: `$leituras.${campo}`, // Obtém o valor do campo especificado
                data: "$leituras.datahora", // Obtém a data da leitura
              },
            },
          },
        },
        {
          $project: {
            _id: 0, // Não inclui o campo _id no resultado final
            estacao: "$_id",
            leituras: 1, // Mantém apenas o campo leituras
          },
        },
      ]);

      res.json(resultado);
    } catch (error) {
      console.error("Erro ao buscar as leituras:", error);
      res.status(500).json({ message: "Erro ao buscar as leituras." });
    }
  }

  // Retorna o valor médio, mínimo e máximo de um campo específico para uma estação no intervalo de datas fornecido
  public async estatisticaporestacao(
    req: Request,
    res: Response
  ): Promise<void> {
    const nomeEstacao = req.params.nomeEstacao;
    const campo = req.params.campo;
    const dataInicio = new Date(req.params.dataInicio);
    const dataFim = new Date(req.params.dataFim);

    try {
      const resultado = await EstacaoModel.aggregate([
        {
          $match: { estacao: nomeEstacao }, // Filtra pela estação especificada na URL
        },
        {
          $unwind: "$leituras", // "Desconstrói" o array leituras em documentos individuais
        },
        {
          $match: {
            "leituras.datahora": {
              $gte: dataInicio, // Filtra as leituras a partir da data de início
              $lte: dataFim, // Filtra as leituras até a data de fim
            },
          },
        },
        {
          $group: {
            _id: "$estacao",
            valorMedio: { $avg: `$leituras.${campo}` }, // Calcula a média do campo especificado
            valorMinimo: { $min: `$leituras.${campo}` }, // Calcula o mínimo do campo especificado
            valorMaximo: { $max: `$leituras.${campo}` }, // Calcula o máximo do campo especificado
          },
        },
        {
          $project: {
            _id: 0, // Não inclui o campo _id no resultado final
            estacao: "$_id",
            valorMedio: 1,
            valorMinimo: 1,
            valorMaximo: 1,
          },
        },
      ]);

      res.json(resultado);
    } catch (error) {
      console.error("Erro ao buscar as estatísticas:", error);
      res.status(500).json({ message: "Erro ao buscar as estatísticas." });
    }
  }

  public async intervalo(req: Request, res: Response): Promise<void> {
    const nomeEstacao = req.params.nomeEstacao;
    const dataInicio = new Date(req.params.dataInicio);
    const dataFim = new Date(req.params.dataFim);

    try {
      const resultado = await EstacaoModel.aggregate([
        {
          $match: { estacao: nomeEstacao }, // Filtra pela estação especificada na URL
        },
        {
          $unwind: "$leituras", // "Desconstrói" o array leituras em documentos individuais
        },
        {
          $match: {
            "leituras.datahora": {
              $gte: dataInicio, // Filtra as leituras a partir da data de início
              $lte: dataFim, // Filtra as leituras até a data de fim
            },
          },
        },
        {
          $group: {
            _id: "$estacao",
            leituras: {
              $push: {
                leitura: "$leituras",
              },
            },
          },
        },
        {
          $project: {
            _id: 0, // Não inclui o campo _id no resultado final
            estacao: "$_id",
            leituras: 1, // Mantém apenas o campo leituras
          },
        },
      ]);

      res.json(resultado);
    } catch (error) {
      console.error("Erro ao buscar as leituras:", error);
      res.status(500).json({ message: "Erro ao buscar as leituras." });
    }
  }
}
export default new EstacaoController();
