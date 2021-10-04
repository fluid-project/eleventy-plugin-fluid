/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
"use strict";

const MarkdownIt = require("markdown-it");

module.exports = function (content, src, alt) {
    if (src === "" || alt === "") {
        // Both image source and alternative text are required. If either is missing, return an empty string.
        return "";
    }

    let caption;

    // Captions are optional; if the shortcode is empty, supply an empty string as the caption.
    if (content.trim()) {
        const md = new MarkdownIt({
            html: true,
            linkify: true
        });

        caption = `<figcaption>${md.render(content).trim()}</figcaption>`;
    } else {
        caption = "";
    }

    return `<figure><img src="${src}" alt="${alt}">${caption}</figure>\n`;
};
