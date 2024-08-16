
import i18n from "eleventy-plugin-i18n-gettext";
import rtlDetect from "rtl-detect";
import path from "node:path";

/**
 * @param  {Object} data - A directory data object.
 * @param  {String} dir - The current directory.
 *
 * @return {Object} - The localized data.
 */
const localizeData = (data, dir) => {
    let locale = path.basename(dir);
    return i18n.enhance11tydata(data, locale, rtlDetect.getLangDir(locale));
};

export default localizeData;
