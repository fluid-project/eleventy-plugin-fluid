/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/

import MarkdownIt from 'markdown-it';

/**
 * @param {string} content - The optional caption content.
 * @param {string} source - The image source URL.
 * @param {string} alt - The image alternative text.
 * @returns {string} The rendered <figure>.
 */
export default function figureShortcode(content, source, alt) {
	if (source === '' || alt === '') {
		// Both image source and alternative text are required. If either is missing, return an empty string.
		return '';
	}

	let caption;

	// Captions are optional; if the shortcode is empty, supply an empty string as the caption.
	if (content.trim()) {
		const md = new MarkdownIt({
			html: true,
			linkify: true,
		});

		caption = `<figcaption>${md.render(content).trim()}</figcaption>`;
	} else {
		caption = '';
	}

	return `<figure><img src="${source}" alt="${alt}">${caption}</figure>\n`;
}
