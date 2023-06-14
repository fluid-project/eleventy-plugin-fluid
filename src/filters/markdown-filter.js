/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
"use strict";

const TemplateConfig = require("@11ty/eleventy/src/TemplateConfig.js");
const TemplateEngineManager = require("@11ty/eleventy/src/TemplateEngineManager.js");
module.exports = function markdown(value) {
    let config = new TemplateConfig();
    let tem = new TemplateEngineManager(config);
    const md = tem.getEngine("md").engineLib;
    return md.render(value);
};
