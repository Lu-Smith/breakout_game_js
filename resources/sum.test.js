"use strict";

var _sum = require("./sum");

describe("example tests", function () {
  it("should add 1 + 2 to eqaul 3", function () {
    var result = (0, _sum.sum)(1, 2);
    expect(result).toBe(3);
  });
  it("object assigment", function () {
    var obj = {};
    expect(obj).toEqual({});
  });
});