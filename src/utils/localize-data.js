"use strict";

const i18n = require("eleventy-plugin-i18n-gettext");
const { getLangDir } = require("rtl-detect");
const path = require("path");

/**
 * @param  {Object} data - A directory data object.
 * @param  {String} dir - The current directory.
 *
 * @return {Object} - The localized data.
 */
const localizeData = (data, dir) => {
    let locale = path.basename(dir);
    return i18n.enhance11tydata(data, locale, getLangDir(locale));
};

module.exports = localizeData;
