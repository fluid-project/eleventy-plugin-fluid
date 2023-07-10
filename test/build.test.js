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
const Eleventy = require("@11ty/eleventy");

test("Builds minified CSS", async function (t) {
    let elev = new Eleventy();
    let json = await elev.toJSON();
    let css = json.find(function (item) {
        return item.outputPath === "dist/assets/styles/app.css";
    });
    t.is(css.content, "*+*{margin-top:var(--space, 1em)}");
});
