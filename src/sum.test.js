import {sum} from "./sum"

describe("example tests", ()=> {

    it("should add 1 + 2 to eqaul 3", () => {
        const result = sum(1,2);
        expect(result).toBe(3);
    })

    it("object assigment", () => {
        const obj = {};
        expect(obj).toEqual({})
    })
})

describe("truthy or falsy", () => {
    it("null", () => {
        const n = null;
        expect(n).toBeFalsy()
        
    })
})
