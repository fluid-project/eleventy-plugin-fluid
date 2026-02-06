/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/

import esbuild from 'esbuild';
import path from 'node:path';

/**
 *
 * @param {string} inputPath - The path of the JavaScript file to compile.
 * @param {object} options - The options for the compiler.
 */
export default async function compileJs(inputPath, options) {
	const {minify, target, outdir} = options;

	const outputBasename = path.basename(outdir);
	const relativePath = inputPath.split(outputBasename)[1];
	const outputDirectory = `./${path.dirname(path.join(outdir, relativePath))}`;

	await esbuild.build({
		bundle: true,
		entryPoints: [inputPath],
		minify,
		target,
		outdir: outputDirectory,
	});
}
