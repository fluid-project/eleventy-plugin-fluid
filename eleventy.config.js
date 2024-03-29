/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
"use strict";

const fluidPlugin = require("./index.js");
const slugify = require("@sindresorhus/slugify");

const inputPath = "fixtures";

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(fluidPlugin, {
        markdown: {
            plugins: [
                ["markdown-it-anchor", { slugify: s => slugify(s) }]
            ]
        },
        sass: {
            enabled: true
        },
        supportedLanguages: {
            de: {
                slug: "de",
                uioSlug: "de",
                dir: "ltr",
                name: "Deutsch"
            }
        }
    });
    eleventyConfig.addPassthroughCopy(`${inputPath}/assets/images`, "/assets/");

    ["en", "fr"].forEach(lang => {
        eleventyConfig.addCollection(`posts_${lang}`, collection => {
            return collection.getFilteredByGlob(`./fixtures/posts/${lang}/*.md`);
        });
    });

    return {
        dir: {
            input: inputPath
        },
        passthroughFileCopy: true
    };
};
