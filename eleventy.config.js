/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/

import fluidPlugin from './index.js';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItDefList from 'markdown-it-deflist';

const inputPath = 'fixtures';

/**
 * @param {object} eleventyConfig The Eleventy configuration object.
 * @returns {object} Eleventy configuration.
 */
export default function eleventy(eleventyConfig) {
	eleventyConfig.addPlugin(fluidPlugin, {
		markdown: {
			plugins: [
				[markdownItAnchor, {permalink: markdownItAnchor.permalink.headerLink({safariReaderFix: true})}],
				markdownItDefList,
			],
		},
		supportedLanguages: {
			'de-DE': {
				slug: 'de',
				uioSlug: 'de',
				dir: 'ltr',
				name: 'Deutsch',
			},
		},
	});
	eleventyConfig.addPassthroughCopy(`${inputPath}/assets/images`, '/assets/');

	for (const lang of ['en', 'fr', 'de-DE']) {
		eleventyConfig.addCollection(`posts_${lang}`, collection => collection.getFilteredByGlob(`./fixtures/posts/${lang}/*.md`));
	}

	return {
		dir: {
			input: inputPath,
		},
		passthroughFileCopy: true,
	};
}
