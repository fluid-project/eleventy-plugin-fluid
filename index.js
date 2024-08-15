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
const path = require("path");
const MarkdownIt = require("markdown-it");
const { EleventyRenderPlugin, EleventyI18nPlugin } = require("@11ty/eleventy");
const { getLangDir } = require("rtl-detect");
const i18n = require("eleventy-plugin-i18n-gettext");
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const figureShortcode = require("./src/shortcodes/figure-shortcode.js");
const formatDateFilter = require("./src/filters/format-date-filter.js");
const htmlMinifyTransform = require("./src/transforms/html-minify-transform.js");
const isoDateFilter = require("./src/filters/iso-date-filter.js");
const limitFilter = require("./src/filters/limit-filter.js");
const splitFilter = require("./src/filters/split-filter.js");
const uioShortcodes = require("./src/shortcodes/uio.js");
const uioAssets = require("./src/config/uio-assets.json");
const languages = require("./src/config/languages.json");
const compileCss = require("./src/compilers/compile-css.js");
const compileSass = require("./src/compilers/compile-sass.js");
const compileJs = require("./src/compilers/compile-js.js");
const merge = require("@11ty/eleventy/src/Util/Merge.js");

module.exports = {
    initArguments: {},
    configFunction: function (eleventyConfig, options = {}) {
        options = merge({
            uio: true,
            markdown: {
                options: {
                    html: true,
                    linkify: true,
                    typographer: true
                },
                plugins: []
            },
            css: {
                basePath: `./${eleventyConfig.dir.input || "src"}/assets/styles`,
                enabled: true,
                minify: true,
                sourceMap: false,
                drafts: {
                    nesting: true
                },
                browserslist: "> 1%"
            },
            sass: {
                basePath: `./${eleventyConfig.dir.input || "src"}/assets/styles`,
                enabled: false,
                minify: true,
                sourceMap: false,
                drafts: {
                    nesting: true
                },
                browserslist: "> 1%"
            },
            js: {
                basePath: `./${eleventyConfig.dir.input || "src"}/assets/scripts`,
                enabled: true,
                minify: true,
                target: "es2020",
                outdir: `./${eleventyConfig.dir.output || "_site"}/assets/scripts`
            },
            webc: {
                components: `./${eleventyConfig.dir.input || "src"}/_components/**/*.webc`
            },
            supportedLanguages: languages,
            defaultLanguage: "en",
            i18n: true,
            localesDirectory: `./${eleventyConfig.dir.input || "src"}/_locales`,
            templateFormats: [
                "html",
                "md",
                "webc",
                "11ty.js",
                "liquid",
                "njk",
                "hbs",
                "mustache",
                "ejs",
                "haml",
                "pug"
            ]
        }, options);

        /** Plugins */
        eleventyConfig.addPlugin(EleventyI18nPlugin, {
            defaultLanguage: options.defaultLanguage
        });
        if (options.i18n) {
            eleventyConfig.addPlugin(i18n, {
                localesDirectory: options.localesDirectory
            });
        }
        eleventyConfig.addPlugin(EleventyRenderPlugin);
        eleventyConfig.addPlugin(pluginWebc, options.webc);

        /** Global Data */
        eleventyConfig.addGlobalData("defaultLanguage", options.defaultLanguage);
        eleventyConfig.addGlobalData("defaultLanguageDirection", getLangDir(options.defaultLanguage));
        eleventyConfig.addGlobalData("supportedLanguages", options.supportedLanguages);

        /** Filters */
        eleventyConfig.addFilter("formatDate", formatDateFilter);
        eleventyConfig.addFilter("isoDate", isoDateFilter);
        eleventyConfig.addFilter("limit", limitFilter);
        eleventyConfig.addFilter("markdown", function (value) {
            // eslint-disable-next-line no-console
            console.warn("The markdown filter will be removed in a future version of eleventy-plugin-fluid. Use the renderString shortcode instead.");

            const md = new MarkdownIt(options.markdown.options);
            options.markdown.plugins.forEach(plugin => {
                if (typeof plugin === "string") {
                    md.use(require(plugin));
                } else {
                    const [pluginPackage, options = {}] = plugin;
                    md.use(require(pluginPackage), options);
                }
            });

            return md.render(value);
        });
        eleventyConfig.addFilter("split", splitFilter);

        /** Shortcodes */
        eleventyConfig.addShortcode("renderString", async function (content, format) {
            if (options.templateFormats.includes(format)) {
                return eleventyConfig.javascriptFunctions.renderTemplate.call(this, content, format);
            }

            return content;
        });

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
        eleventyConfig.amendLibrary("md", md => {
            md.set(options.markdown.options);
            options.markdown.plugins.forEach(plugin => {
                if (typeof plugin === "string") {
                    md.use(require(plugin));
                } else {
                    const [pluginPackage, options = {}] = plugin;
                    md.use(require(pluginPackage), options);
                }
            });
        });

        if (options.css.enabled) {
            eleventyConfig.addTemplateFormats("css");
            eleventyConfig.addExtension("css", {
                outputFileExtension: "css",
                getData: async function () {
                    return {
                        eleventyExcludeFromCollections: true
                    };
                },
                compile: async function (inputContent, inputPath) {
                    return await compileCss(inputContent, inputPath, options.css);
                }
            });
        }

        if (options.sass.enabled) {
            eleventyConfig.addTemplateFormats("scss");
            eleventyConfig.addExtension("scss", {
                outputFileExtension: "css",
                getData: async function () {
                    return {
                        eleventyExcludeFromCollections: true
                    };
                },
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
                        const outputBasename = path.basename(options.js.outdir);
                        const relativePath = item.split(outputBasename)[1];
                        const outputDir = `./${path.dirname(path.join(options.js.outdir, relativePath))}`;
                        // eslint-disable-next-line no-console
                        console.log(`[11ty] Writing ${path.join(outputDir, path.basename(item))} from ${item}`);
                    }
                });
            });
        }

        /** Transforms */
        eleventyConfig.addTransform("htmlMinify", htmlMinifyTransform);
    },
    generatePermalink: require("./src/utils/generate-permalink.js"),
    localizeData: require("./src/utils/localize-data.js")
};
