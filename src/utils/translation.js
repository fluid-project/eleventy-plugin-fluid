/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
import rosetta from "rosetta";

/**
 *
 * @param {String} key - The translation key. Must exist in (at least) one language within the translations object.
 * @param {Object} values - An object containing values which can be substituted for keyed placeholders in the translated string.
 * @param {Object} data - An object containing the translations and locale keys from Eleventy's global data.
 * @return {String} - The localized string.
 */
const __ = function (key, values = {}, data = {}) {
    if (!data.hasOwnProperty("locale") || !data.hasOwnProperty("translations")) {
        data = this.ctx;
    }

    const i18n = rosetta(data.translations);
    i18n.locale(data.locale);
    return i18n.t(key, values);
};

/**
 *
 * @param {String} singular - The translation key for the singular version of the string. Must exist in (at least) one language within the translations object.
 * @param {String} plural - The translation key for the plural version of the string. Must exist in (at least) one language within the translations object.
 * @param {Object} values - An object containing data which can be substituted for keyed placeholders in the translated string. Must contain the key n, corresponding to the count within the translatable string.
 * @param {Object} data - An object containing the translations and locale keys from Eleventy's global data.
 * @return {String} - The localized string.
 */
const _n = function (singular, plural, values = {}, data = {}) {
    if (!data.hasOwnProperty("locale") || !data.hasOwnProperty("translations")) {
        data = this.ctx;
    }

    const i18n = rosetta(data.translations);
    i18n.locale(data.locale);
    const key = values.n === 1 ? singular : plural;
    return i18n.t(key, values);
};

export {
    __,
    _n
};
