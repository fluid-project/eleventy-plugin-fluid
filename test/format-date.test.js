/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
"use strict";

const test = require("ava");
const formatDateFilter = require("../src/filters/format-date-filter.js");

test("Formats date properly", function (t) {
    t.is(formatDateFilter("2020-01-01"), "January 1st, 2020");
});
