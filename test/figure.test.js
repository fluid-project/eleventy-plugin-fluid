/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/

import assert from 'node:assert';
import test from 'node:test';
import figureShortcode from "../src/shortcodes/figure-shortcode.js";

test("Renders with caption", () => {
    assert.strictEqual(figureShortcode("A caption.", "/assets/image.png", "A description of the image."), "<figure><img src=\"/assets/image.png\" alt=\"A description of the image.\"><figcaption><p>A caption.</p></figcaption></figure>\n");
});

test("Renders without caption", () => {
    assert.strictEqual(figureShortcode("\n", "/assets/image.png", "A description of the image."), "<figure><img src=\"/assets/image.png\" alt=\"A description of the image.\"></figure>\n");
});

test("Renders caption containing line breaks without <br> tag", () => {
    assert.strictEqual(figureShortcode("A caption\nwith line break.", "/assets/image.png", "A description of the image."), "<figure><img src=\"/assets/image.png\" alt=\"A description of the image.\"><figcaption><p>A caption\nwith line break.</p></figcaption></figure>\n");
});

test("Returns empty string with missing source", () => {
    assert.strictEqual(figureShortcode("A caption.", "", "A description of the image."), "");
});

test("Returns empty string with missing alt text", () => {
    assert.strictEqual(figureShortcode("A caption.", "/assets/image.png", ""), "");
});
