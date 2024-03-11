import somarArray from "../src/array";

jest.mock("../src/Operacao", () => {
    return{
        somar: jest.fn().mockImplementation( (a,b)=>a+b )
    }
});

it("Somar array", () => {
    const r = somarArray([1, 2, 3, 4]);
    expect(r).toBe(10);
});