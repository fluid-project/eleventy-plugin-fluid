/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
"use strict";

const esbuild = require("esbuild");
const path = require("path");

module.exports = async (inputPath, options) => {
    let {minify, target, outdir} = options;

    const outputBasename = path.basename(outdir);
    const relativePath = inputPath.split(outputBasename)[1];
    const outputDir = `./${path.dirname(path.join(outdir, relativePath))}`;

    await esbuild.build({
        bundle: true,
        entryPoints: [inputPath],
        minify,
        target,
        outdir: outputDir
    });
};
