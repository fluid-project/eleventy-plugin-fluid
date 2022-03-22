/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
"use strict";

const formatOrdinal = function (n) {
    const pr = new Intl.PluralRules("en", {
        type: "ordinal"
    });

    const suffixes = new Map([
        ["one",   "st"],
        ["two",   "nd"],
        ["few",   "rd"],
        ["other", "th"]
    ]);

    const rule = pr.select(n);
    const suffix = suffixes.get(rule);
    return `${n}${suffix}`;
};

module.exports = function dateFilter(value, locale = "en") {
    const dateObject = new Date(new Date(value).toUTCString());
    const options = { year: "numeric", month: "long", day: "numeric"};

    if (locale.startsWith("en")) {
        let date = dateObject.toLocaleDateString(locale, options);
        const regex = /([A-Z]\w+) ([0-9]{1,2}), ([0-9]{4})/g;
        return date.replace(regex, (match, p1, p2, p3) => {
            return `${p1} ${formatOrdinal(p2)}, ${p3}`;
        });
    }

    return dateObject.toLocaleDateString(locale, options);
};
