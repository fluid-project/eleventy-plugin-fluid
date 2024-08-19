import rtlDetect from "rtl-detect";
import parseLocale from "./parse-locale.js";
import path from "node:path";

/**
 * @param  {Object} data - A directory data object.
 * @param  {String} dir - The current directory.
 *
 * @return {Object} - The localized data.
 */
const localizeData = (data, dir) => {
    const { locale, lang } = parseLocale(path.win32.basename(dir));
    const langDir = rtlDetect.getLangDir(locale);

    return Object.assign(data, {
        locale, lang, langDir
    });
};

export default localizeData;
