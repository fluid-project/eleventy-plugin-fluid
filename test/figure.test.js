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
const figureShortcode = require("../src/shortcodes/figure-shortcode.js");

test("Renders with caption", function (t) {
    t.is(figureShortcode("A caption.", "/assets/image.png", "A description of the image."), "<figure><img src=\"/assets/image.png\" alt=\"A description of the image.\"><figcaption><p>A caption.</p></figcaption></figure>\n");
});

test("Renders without caption", function (t) {
    t.is(figureShortcode("\n", "/assets/image.png", "A description of the image."), "<figure><img src=\"/assets/image.png\" alt=\"A description of the image.\"></figure>\n");
});

test("Returns empty string with missing source", function (t) {
    t.is(figureShortcode("A caption.", "", "A description of the image."), "");
});

test("Returns empty string with missing alt text", function (t) {
    t.is(figureShortcode("A caption.", "/assets/image.png", ""), "");
});
