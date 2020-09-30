/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/greatislander/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/greatislander/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
"use strict";

// @see https://stackoverflow.com/a/31615643
const getOrdinal = function (n) {
    const s = ["th", "st", "nd", "rd"],
        v = n % 100;

    return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

module.exports = function dateFilter(value) {
    let [y, m, d] = value.split("-");
    m = parseInt(m, 10);
    d = parseInt(d, 10);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return `${months[m - 1]} ${getOrdinal(d)}, ${y}`;
};
