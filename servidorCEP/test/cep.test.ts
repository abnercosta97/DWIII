import getCep, { obtercep } from "../src/service/cep";
import { Request, Response } from "express";
import request from "supertest";
import app from "../src";

describe("Teste de CEP", () => {
  test("Cep válido", async () => {
    const r = await getCep("12328070");
    expect(r).toMatchObject({
      cep: "12328-070",
      logradouro: "Avenida Faria Lima",
    });
    //expect(r.cep).toBe("12328-070");
  });
  test("Cep inválido", async () => {
    const r = await getCep("12328071");
    expect(r).toMatchObject({ erro: "true" });
  });
  test("Cep imcompleto", async () => {
    const r = await getCep("1232807");
    expect(r).toMatchObject({ message: expect.any(String) });
    //{message:"Request failed with status code 400"});
  });
});

describe("CEP HTTP", () => {
  it("CEP válido", async () => {
    const req = { body: { cep: "12328070" } } as Request;
    const res = { json: jest.fn() } as unknown as Response;

    await obtercep(req, res);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ cep: "12328-070" })
    );
  });

  it("CEP inválido", async () => {
    const req = { body: { cep: "12328071" } } as Request;
    const res = { json: jest.fn() } as unknown as Response;

    await obtercep(req, res);
    expect(res.json).toHaveBeenCalledWith({ erro: "true" });
  });

  it("CEP imcompleto", async () => {
    const req = { body: { cep: "1232807" } } as Request;
    const res = { json: jest.fn() } as unknown as Response;

    await obtercep(req, res);
    expect(res.json).toHaveBeenCalledWith({
      message: expect.stringMatching(/Request failed/i),
    });
  });
});

describe("Teste de integração", () => {
  it("CEP válido", async () => {
    const response = await request(app).get("/").send({ cep: "12328070" });

    expect(response.body.cep).toBe("12328-070");
  });

  it("CEP inválido", async () => {
    const response = await request(app).get("/").send({ cep: "12328071" });

    expect(response.body.erro).toBe("true");
  });

  it("CEP imcompleto", async () => {
    const response = await request(app).get("/").send({ cep: "1232807" });

    expect(response.body.message).toMatch(/Request failed/i);
  });

});
