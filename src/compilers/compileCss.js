"use strict";

const autoprefixer = require("autoprefixer");
const postcss = require("postcss");
const postcssCsso = require("postcss-csso");
const postcssLogical = require("postcss-logical");

module.exports = async (content, path, paths) => {
    if (!paths.includes(path)) {
        return;
    }

    let output = await postcss([
        postcssLogical,
        autoprefixer,
        postcssCsso
    ]).process(content, {
        from: path
    });

    return async () => {
        return output.css;
    };
};
