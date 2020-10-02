/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
"use strict";

const formatDateFilter = require("./src/filters/format-date-filter.js");
const isoDateFilter = require("./src/filters/iso-date-filter.js");
const limitFilter = require("./src/filters/limit-filter.js");
const markdownFilter = require("./src/filters/markdown-filter.js");
const slugFilter = require("./src/filters/slug-filter.js");
const uioShortcodes = require("./src/shortcodes/uio.js");
const uioAssets = require("./src/config/uio-assets.json");

module.exports = function(eleventyConfig) {
    eleventyConfig.addFilter("formatDate", formatDateFilter);
    eleventyConfig.addFilter("isoDate", isoDateFilter);
    eleventyConfig.addFilter("limit", limitFilter);
    eleventyConfig.addFilter("markdown", markdownFilter);
    eleventyConfig.addFilter("slug", slugFilter);

    Object.keys(uioShortcodes).forEach((shortcodeName) => {
        eleventyConfig.addShortcode(shortcodeName, uioShortcodes[shortcodeName])
    });

    uioAssets.forEach((asset) => {
        const fileMapping = {};
        fileMapping[`node_modules/infusion/${asset}`] = `lib/infusion/${asset.replace("dist/", "")}`;
        eleventyConfig.addPassthroughCopy(fileMapping);
    })

    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: "_includes"
        },
        passthroughFileCopy: true
    }
};
