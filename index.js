/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
"use strict";

const fg = require("fast-glob");
const path = require("node:path");
const figureShortcode = require("./src/shortcodes/figure-shortcode.js");
const formatDateFilter = require("./src/filters/format-date-filter.js");
const htmlMinifyTransform = require("./src/transforms/html-minify-transform.js");
const isoDateFilter = require("./src/filters/iso-date-filter.js");
const limitFilter = require("./src/filters/limit-filter.js");
const markdownFilter = require("./src/filters/markdown-filter.js");
const splitFilter = require("./src/filters/split-filter.js");
const uioShortcodes = require("./src/shortcodes/uio.js");
const uioAssets = require("./src/config/uio-assets.json");
const compileCss = require("./src/compilers/compile-css.js");
const compileSass = require("./src/compilers/compile-sass.js");
const compileJs = require("./src/compilers/compile-js.js");
const deepMerge = require("./src/utils/deep-merge.js");

module.exports = {
    initArguments: {},
    configFunction: function (eleventyConfig, options = {}) {
        options = deepMerge({
            uio: true,
            css: {
                basePath: "./src/assets/styles",
                enabled: true,
                minify: true,
                sourceMap: false,
                drafts: {
                    nesting: true
                },
                browserslist: "> 1%"
            },
            sass: {
                basePath: "./src/assets/styles",
                enabled: false,
                minify: true,
                sourceMap: false,
                drafts: {
                    nesting: true
                },
                browserslist: "> 1%"
            },
            js: {
                basePath: "./src/assets/scripts",
                enabled: true,
                minify: true,
                target: "es2020",
                outdir: "./dist/assets/scripts"
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
        if (options.css.enabled) {
            eleventyConfig.addTemplateFormats("css");
            eleventyConfig.addExtension("css", {
                outputFileExtension: "css",
                compile: async function (inputContent, inputPath) {
                    return await compileCss(inputContent, inputPath, options.css);
                }
            });
        }

        if (options.sass.enabled) {
            eleventyConfig.addTemplateFormats("scss");
            eleventyConfig.addExtension("scss", {
                outputFileExtension: "css",
                compile: async function (inputContent, inputPath) {
                    return await compileSass(inputContent, inputPath, options.sass, this);
                }
            });
        }

        if (options.js.enabled) {
            eleventyConfig.addWatchTarget(options.js.basePath);
            eleventyConfig.on("eleventy.before", async () => {
                const entryPoints = await fg([`${options.js.basePath}/**/*.js`]);
                entryPoints.forEach(async item => {
                    if (!path.basename(item).startsWith("_")) {
                        await compileJs(item, options.js);
                        // eslint-disable-next-line no-console
                        console.log(`[11ty] Writing ${options.js.outdir}/${path.basename(item)} from ${item}`);
                    }
                });
            });
        }

        /** Transforms */
        eleventyConfig.addTransform("htmlMinify", htmlMinifyTransform);
    }
};
