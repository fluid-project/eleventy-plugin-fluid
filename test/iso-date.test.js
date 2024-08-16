/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/

import test from "ava";
import isoDateFilter from "../src/filters/iso-date-filter.js";

test("Formats date properly", function (t) {
    t.is(isoDateFilter("Sun Jun 21 2020 18:00:00 GMT-0300 (Atlantic Daylight Time)"), "2020-06-21T21:00:00.000Z");
});
