"use strict";

var _script = require("./script");

it('Should 1 add 2 to be equale to 3', function () {
  expect((0, _script.sum)(1, 2)).toBe(3);
});