/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
import { I18n } from "i18n-js";

/**
 *
 * @param {String} key - The translation key. Must exist in (at least) one language within the translations object.
 * @param {Object} values - An object containing values which can be substituted for keyed placeholders in the translated string.
 * @param {Object} data - An object containing the translations and lang keys from Eleventy's global data.
 * @return {String} - The localized string.
 */
const __ = function (key, values = {}, data = {}) {
    const lang = data.lang || this.page.lang;
    const translations = data.translations || this.ctx.translations;

    const i18n = new I18n(translations);
    i18n.locale = lang;
    return i18n.t(key, values);
};

export {
    __
};
