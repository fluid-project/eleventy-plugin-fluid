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
const { bundle, browserslistToTargets } = require("lightningcss");
const path = require("node:path");

module.exports = async (content, inputPath, options) => {
    let parsed = path.parse(inputPath);
    if (!inputPath.startsWith(options.basePath) || parsed.name.startsWith("_")) {
        return;
    }

    let targets = browserslistToTargets(browserslist(options.browserslist));

    return async () => {
        // These aren't used by LightningCSS, so we remove them before merging and passing the options object.
        delete options.basePath;
        delete options.enabled;

        let { code } = await bundle(Object.assign(
            options,
            {
                filename: inputPath,
                targets
            }
        ));
        return code;
    };
};
