/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/

import browserslist from "browserslist";
import { transform, browserslistToTargets } from "lightningcss";
import * as sass from "sass";
import path from "node:path";

export default async function (inputContent, inputPath, options, templateConfig) {
    let parsed = path.parse(inputPath);
    if (!inputPath.startsWith(options.basePath) || parsed.name.startsWith("_")) {
        return;
    }

    let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || "."],
        sourceMap: options.sourceMap
    });

    /** Register dependencies of the input file: https://www.11ty.dev/docs/languages/custom/#registering-dependencies */
    templateConfig.addDependencies(inputPath, result.loadedUrls);

    let targets = browserslistToTargets(browserslist(options.browserslist));

    return async () => {
        let { code } = await transform(Object.assign(
            options,
            {
                code: Buffer.from(result.css),
                inputSourceMap: options.sourceMap ? result.sourceMap.toString() : null,
                targets
            }
        ));

        return code;
    };
};
