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
const path = require("node:path");

module.exports = async (content, inputPath, options) => {
    let parsed = path.parse(inputPath);
    if (!inputPath.startsWith(options.basePath) || parsed.name.startsWith("_")) {
        return;
    }

    return async () => {
        let {minify, target} = options;

        let output = await esbuild.build({
            bundle: true,
            entryPoints: [inputPath],
            minify,
            target,
            write: false
        });

        return output.outputFiles[0].text;
    };
};
