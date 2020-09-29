/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/greatislander/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/greatislander/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
"use strict";

var test = require("ava");
var limitFilter = require("../src/filters/limit-filter.js");

test("Limits array to n items", function (t) {
  t.deepEqual(limitFilter(["a", "b", "c"], 2), ["a", "b"]);
});
