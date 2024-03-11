import somarArray from "../src/array";

jest.mock("../src/Operacao", () => {
    
});

it("Somar array", () => {
    const r = somarArray([1, 2, 3, 4]);
    expect(r).toBe(10);
});