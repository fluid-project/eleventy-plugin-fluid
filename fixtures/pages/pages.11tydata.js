"use strict";

const { getLangDir } = require("rtl-detect");
const { generatePermalink } = require("../../index.js");

module.exports = {
    layout: "layouts/base.njk",
    eleventyComputed: {
        langDir: data => getLangDir(data.locale),
        permalink: data => {
            return generatePermalink(data, "pages");
        }
    }
};
