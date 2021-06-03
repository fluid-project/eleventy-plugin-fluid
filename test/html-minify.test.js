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
const htmlMinifyTransform = require("../src/transforms/html-minify-transform.js");
const html = `
<!DOCTYPE html>
<html lang="en-ca">
  <head>
	<meta charset="utf-8">
	<title>eleventy-plugin-fluid</title>
  </head>
  <body>
	<h1>eleventy-plugin-fluid</h1>
	<p>Not much to see here!</p>
  </body>
</html>
`;

test("Minifies HTML", function (t) {
    t.is(htmlMinifyTransform(html, "index.html"), "<!doctype html><html lang=\"en-ca\"><head><meta charset=\"utf-8\"><title>eleventy-plugin-fluid</title></head><body><h1>eleventy-plugin-fluid</h1><p>Not much to see here!</p></body></html>");
});
