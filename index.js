/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/

import fg from "fast-glob";
import path from "node:path";
import { readFileSync } from "node:fs";
import { EleventyRenderPlugin, EleventyI18nPlugin } from "@11ty/eleventy";
import rtlDetect from "rtl-detect";
import figureShortcode from "./src/shortcodes/figure-shortcode.js";
import formatDateFilter from "./src/filters/format-date-filter.js";
import generatePermalink from "./src/utils/generate-permalink.js";
import htmlMinifyTransform from "./src/transforms/html-minify-transform.js";
import isoDateFilter from "./src/filters/iso-date-filter.js";
import limitFilter from "./src/filters/limit-filter.js";
import localizeData from "./src/utils/localize-data.js";
import splitFilter from "./src/filters/split-filter.js";
import uioShortcodes from "./src/shortcodes/uio.js";
const uioAssets = JSON.parse(
    readFileSync(
        new URL("./src/config/uio-assets.json", import.meta.url)
    )
);
const languages = JSON.parse(
    readFileSync(
        new URL("./src/config/languages.json", import.meta.url)
    )
);
import compileCss from "./src/compilers/compile-css.js";
import compileSass from "./src/compilers/compile-sass.js";
import compileJs from "./src/compilers/compile-js.js";
import eleventyUtils from "@11ty/eleventy-utils";
import { __, _n } from "./src/utils/translation.js";

const fluidPlugin = {
    initArguments: {},
    configFunction: function (eleventyConfig, options = {}) {
        options = eleventyUtils.Merge({
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
            localesDirectory: `./${eleventyConfig.dir.input || "src"}/_locales`
        }, options);

        /** Plugins */
        eleventyConfig.addPlugin(EleventyI18nPlugin, {
            defaultLanguage: options.defaultLanguage
        });
        eleventyConfig.addPlugin(EleventyRenderPlugin);

        /** Global Data */
        eleventyConfig.addGlobalData("defaultLanguage", options.defaultLanguage);
        eleventyConfig.addGlobalData("defaultLanguageDirection", rtlDetect.getLangDir(options.defaultLanguage));
        eleventyConfig.addGlobalData("supportedLanguages", options.supportedLanguages);

        /** Filters */
        eleventyConfig.addFilter("formatDate", formatDateFilter);
        eleventyConfig.addFilter("isoDate", isoDateFilter);
        eleventyConfig.addFilter("limit", limitFilter);
        eleventyConfig.addFilter("split", splitFilter);

        if (options.i18n) {
            eleventyConfig.addShortcode("__", __);
            eleventyConfig.addShortcode("_n", _n);
        }

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
                if (Array.isArray(plugin)) {
                    const [pluginModule, options = {}] = plugin;
                    md.use(pluginModule, options);
                } else {
                    md.use(plugin);
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
    }
};

export default fluidPlugin;

export {
    fluidPlugin,
    generatePermalink,
    localizeData,
    __,
    _n
};
