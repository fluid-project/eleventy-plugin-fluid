/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/

import browserslist from 'browserslist';
import {bundle, browserslistToTargets} from 'lightningcss';
import path from 'node:path';

/**
 *
 * @param {string} _content - The content of the CSS file.
 * @param {string} inputPath - The path of the CSS file to compile.
 * @param {object} options - The options for the compiler.
 * @returns {string} The compiled CSS.
 */
export default async function compileCss(_content, inputPath, options) {
	const parsed = path.parse(inputPath);
	if (!inputPath.startsWith(options.basePath) || parsed.name.startsWith('_')) {
		return;
	}

	const targets = browserslistToTargets(browserslist(options.browserslist));

	return async () => {
		const {code} = await bundle(Object.assign(
			options,
			{
				filename: inputPath,
				targets,
			},
		));
		return code;
	};
}
