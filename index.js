/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
"use strict";

const figureShortcode = require("./src/shortcodes/figure-shortcode.js");
const formatDateFilter = require("./src/filters/format-date-filter.js");
const htmlMinifyTransform = require("./src/transforms/html-minify-transform.js");
const isoDateFilter = require("./src/filters/iso-date-filter.js");
const limitFilter = require("./src/filters/limit-filter.js");
const markdownFilter = require("./src/filters/markdown-filter.js");
const splitFilter = require("./src/filters/split-filter.js");
const uioShortcodes = require("./src/shortcodes/uio.js");
const uioAssets = require("./src/config/uio-assets.json");
const compileCss = require("./src/compilers/compileCss.js");
const deepMerge = require("./src/utils/deepMerge.js");

module.exports = {
    initArguments: {},
    configFunction: function (eleventyConfig, options = {}) {
        options = deepMerge({
            uio: true,
            css: {
                basePath: "./src/assets/styles",
                minify: true,
                sourceMap: false,
                drafts: {
                    nesting: true
                },
                browserslist: "> 1%"
            }
        }, options);


        /** Filters */
        eleventyConfig.addFilter("formatDate", formatDateFilter);
        eleventyConfig.addFilter("isoDate", isoDateFilter);
        eleventyConfig.addFilter("limit", limitFilter);
        eleventyConfig.addFilter("markdown", markdownFilter);
        eleventyConfig.addFilter("slug", () => {
            throw new Error("`slug` filter is no longer supported. Please use `slugify`.");
        });
        eleventyConfig.addFilter("split", splitFilter);

        /** Shortcodes */
        eleventyConfig.addPairedShortcode("figure", figureShortcode);

        if (options.uio) {
            Object.keys(uioShortcodes).forEach((shortcodeName) => {
                eleventyConfig.addShortcode(shortcodeName, uioShortcodes[shortcodeName]);
            });

            uioAssets.forEach((asset) => {
                const fileMapping = {};
                fileMapping[`node_modules/infusion/${asset}`] = `lib/infusion/${asset.replace("dist/", "")}`;
                eleventyConfig.addPassthroughCopy(fileMapping);
            });
        }

        /** Template Formats */
        eleventyConfig.addTemplateFormats("css");
        eleventyConfig.addExtension("css", {
            outputFileExtension: "css",
            compile: async (content, path) => {
                return await compileCss(content, path, options.css);
            }
        });

        /** Transforms */
        eleventyConfig.addTransform("htmlMinify", htmlMinifyTransform);
    }
};
