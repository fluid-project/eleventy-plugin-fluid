"use strict";

const { EleventyI18nPlugin } = require("@11ty/eleventy");
const { getLangDir } = require("rtl-detect");
const { generatePermalink } = require("../../index.js");

module.exports = {
    layout: "layouts/base.njk",
    eleventyComputed: {
        lang: data => EleventyI18nPlugin.LangUtils.getLanguageCodeFromInputPath(data.page.inputPath),
        langDir: data => getLangDir(data.lang),
        locale: data => data.lang,
        permalink: data => {
            return generatePermalink(data, "posts", data.locale === "fr" ? "articles" : "posts");
        }
    }
};
