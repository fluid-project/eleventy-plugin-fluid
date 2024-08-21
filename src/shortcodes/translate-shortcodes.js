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
 * @param {Object} data - An object containing data which can be substituted for keyed placeholders in the translated string.
 * @return {String} - The localized string.
 */
const _e = function (key, data = {}) {
    const i18n = rosetta(this.ctx.translations);
    i18n.locale(this.ctx.locale);
    return i18n.t(key, data);
};

/**
 *
 * @param {String} singular - The translation key for the singular version of the string. Must exist in (at least) one language within the translations object.
 * @param {String} plural - The translation key for the plural version of the string. Must exist in (at least) one language within the translations object.
 * @param {Object} data - An object containing data which can be substituted for keyed placeholders in the translated string. Must contain the key n and, corresponding to the count within the translatable string.
 * @return {String} - The localized string.
 */
const _n = function (singular, plural, data = {}) {
    const i18n = rosetta(this.ctx.translations);
    i18n.locale(this.ctx.locale);
    const key = data.n === 1 ? singular : plural;
    return i18n.t(key, data);
};

export {
    _e,
    _n
};
