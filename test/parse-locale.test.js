/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/

import test from "ava";
import parseLocale from "../src/utils/parse-locale.js";

test("Parses language with country code ", function (t) {
    t.deepEqual(parseLocale("en-CA"), {lang: "en", locale: "en-CA"});
});

test("Parses language without country code", function (t) {
    t.deepEqual(parseLocale("en"), {lang: "en", locale: "en"});
});

test("Throws error with invalid input", function (t) {
    const error = t.throws(function () {
        parseLocale("what???");
    }, {instanceOf: Error});
    t.is(error.message, "Locale what??? does not match regex /^(?<lang>.{2})(?:-(?<country>.{2}))*$/");
});
