/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
import assert from "node:assert";
import test from "node:test";
import formatDateFilter from "../src/filters/format-date-filter.js";

test("Formats local date properly", () => {
    assert.strictEqual(formatDateFilter("Sun Jun 21 2020 18:00:00 GMT-0300 (Atlantic Daylight Time)"), "June 21st, 2020");
});

test("Formats local date properly in French", () => {
    assert.strictEqual(formatDateFilter("Sun Jun 21 2020 18:00:00 GMT-0300 (Atlantic Daylight Time)", "fr"), "21 juin 2020");
});
