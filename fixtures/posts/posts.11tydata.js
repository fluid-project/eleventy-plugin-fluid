"use strict";

const { EleventyI18nPlugin } = require("@11ty/eleventy");
const { getLangDir } = require("rtl-detect");
const { generatePermalink } = require("../../index.js");
const i18n = require("eleventy-plugin-i18n-gettext");

module.exports = {
    layout: "layouts/base.njk",
    eleventyComputed: {
        lang: data => EleventyI18nPlugin.LangUtils.getLanguageCodeFromInputPath(data.page.inputPath),
        langDir: data => getLangDir(data.lang),
        locale: data => data.lang,
        permalink: data => {
            const locale = data.locale;
            return generatePermalink(data, "posts", i18n._(locale, "posts"));
        }
    }
};
