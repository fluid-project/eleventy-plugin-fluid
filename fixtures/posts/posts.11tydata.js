"use strict";

const { getLangDir } = require("rtl-detect");
const { generatePermalink } = require("../../index.js");
const i18n = require("eleventy-plugin-i18n-gettext");

module.exports = {
    layout: "layouts/base.njk",
    eleventyComputed: {
        langDir: data => getLangDir(data.locale),
        permalink: data => {
            const locale = data.locale;
            return generatePermalink(data, "posts", i18n._(locale, "posts"));
        }
    }
};
