/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/

import browserslist from "browserslist";
import { bundle, browserslistToTargets } from "lightningcss";
import path from "node:path";

export default async (_content, inputPath, options) => {
    let parsed = path.parse(inputPath);
    if (!inputPath.startsWith(options.basePath) || parsed.name.startsWith("_")) {
        return;
    }

    let targets = browserslistToTargets(browserslist(options.browserslist));

    return async () => {
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
