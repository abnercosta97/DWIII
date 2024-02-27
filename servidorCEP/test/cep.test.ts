import getCep from "../src/service/cep";

test("Cep válido", async () => {
    const r = await getCep("12328070");
    expect(r).toMatchObject({
        cep:"12328-070",
        logradouro:"Avenida Faria Lima"
    });
    //expect(r.cep).toBe("12328-070");
});
test("Cep inválido", async () => {
    const r = await getCep("1232807");
    expect(r).toMatchObject({message:"Request failed with status code 400"});
});