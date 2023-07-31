/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
"use strict";

const MarkdownIt = require("markdown-it");

module.exports = function markdown(value, options, plugins) {
    const md = new MarkdownIt(options);
    Object.values(plugins).forEach(plugin => {
        if (plugin) {
            md.use(plugin);
        }
    });

    return md.render(value);
};
