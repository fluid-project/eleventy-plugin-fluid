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
var slugFilter = require("../src/filters/slug-filter.js");

test("Removes special characters", function (t) {
  t.is(slugFilter("Here’s my title!"), "heres-my-title");
});
