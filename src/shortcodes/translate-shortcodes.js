/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
import rosetta from "rosetta";

const _e = function (key, locale, translations, data = {}) {
    const i18n = rosetta(translations);
    i18n.locale(locale);
    return i18n.t(key, data);
};

const _n = function (singular, plural, locale, translations, data = {}) {
    const i18n = rosetta(translations);
    i18n.locale(locale);
    const key = data.n === 1 ? singular : plural;
    return i18n.t(key, data);
};

export {
    _e,
    _n
};
