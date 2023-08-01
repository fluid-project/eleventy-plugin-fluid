"use strict";

const i18n = require("eleventy-plugin-i18n-gettext");
const { getLangDir } = require("rtl-detect");
const path = require("path");

module.exports = (data, dir) => {
    let locale = path.basename(dir);
    return i18n.enhance11tydata(data, locale, getLangDir(locale));
};
