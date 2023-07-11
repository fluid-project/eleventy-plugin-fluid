/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
"use strict";

const browserslist = require("browserslist");
const { transform, browserslistToTargets } = require("lightningcss");
const sass = require("sass");
const path = require("node:path");

module.exports = async function (inputContent, inputPath, options, self) {
    let parsed = path.parse(inputPath);
    if (!inputPath.startsWith(options.basePath) || parsed.name.startsWith("_")) {
        return;
    }

    let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || "."],
        sourceMap: options.sourceMap
    });

    self.addDependencies(inputPath, result.loadedUrls);

    let targets = browserslistToTargets(browserslist(options.browserslist));

    return async () => {
        let { code } = await transform(Object.assign(
            options,
            {
                code: Buffer.from(result.css),
                sourcemap: false,
                targets
            }
        ));
        return code;
    };
};
