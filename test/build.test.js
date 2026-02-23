/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/

import assert from 'node:assert';
import {beforeEach, test} from 'node:test';
import fs from 'node:fs';
import Eleventy from '@11ty/eleventy';

beforeEach(async () => {
	const elev = new Eleventy('.', '_site', {
		quietMode: true,
	});
	await elev.write();
});

test('Builds minified CSS', async () => {
	const mainCss = fs.readFileSync('_site/assets/styles/app.css', 'utf8');
	const timelineCss = fs.readFileSync('_site/assets/styles/pages/timeline.css', 'utf8');
	assert.strictEqual(mainCss, '*{box-sizing:border-box}button{font-family:inherit;font-size:1rem}*+*{margin-top:var(--space,1em)}');
	assert.strictEqual(timelineCss, '.timeline ul{padding-inline-start:0;list-style:none}');
});

test('Builds minified JavaScript', async () => {
	const nojsJs = fs.readFileSync('_site/assets/scripts/no-js.js', 'utf8');
	assert.strictEqual(nojsJs, '(()=>{document.documentElement.className="js";})();\n');
});

test('Uses Markdown plugin', async () => {
	const indexPage = fs.readFileSync('_site/index.html', 'utf8');
	assert.ok(indexPage.includes('<dl><dt>Widdershins</dt><dd>Counter-clockwise.</dd></dl>'));
});

test('Uses Markdown plugin with options', async () => {
	const indexPage = fs.readFileSync('_site/index.html', 'utf8');
	assert.ok(indexPage.includes('<h2 id="definitions" tabindex="-1"><a class="header-anchor" href="#definitions"><span>Definitions</span></a></h2>'));
});

test('Translates strings with placeholders', async () => {
	const englishIndexPage = fs.readFileSync('_site/index.html', 'utf8');
	assert.ok(englishIndexPage.includes('Hello Alice!'));

	const frenchIndexPage = fs.readFileSync('_site/fr/index.html', 'utf8');
	assert.ok(frenchIndexPage.includes('Bonjour Alice !'));
});

test('Translates singular/plural strings with placeholders', async () => {
	const englishIndexPage = fs.readFileSync('_site/index.html', 'utf8');
	assert.ok(englishIndexPage.includes('6 posts'));

	const frenchIndexPage = fs.readFileSync('_site/fr/index.html', 'utf8');
	assert.ok(frenchIndexPage.includes('6 articles'));
});

test('Generates English permalinks', async () => {
	const englishPost = fs.readFileSync('_site/posts/introduction/index.html', 'utf8');
	assert.ok(englishPost.includes('<h1>Introduction</h1>'));

	const english404 = fs.readFileSync('_site/404.html', 'utf8');
	assert.ok(english404.includes('<h1>Page Not Found</h1>'));
});

test('Generates permalinks from a custom slug', async () => {
	const tlaPage = fs.readFileSync('_site/tla/index.html', 'utf8');
	assert.ok(tlaPage.includes('<h1>Three Letter Acronym</h1>'));
});

test('Generates French permalinks', async () => {
	const frPost = fs.readFileSync('_site/fr/articles/introduction/index.html', 'utf8');
	assert.ok(frPost.includes('<h1>Introduction</h1>'));

	const fr404 = fs.readFileSync('_site/fr/404.html', 'utf8');
	assert.ok(fr404.includes('<h1>Page non trouvée</h1>'));
});

test('Generates user-configured language permalinks', async () => {
	const dePost = fs.readFileSync('_site/de/artikel/einfuehrung/index.html', 'utf8');
	assert.ok(dePost.includes('<h1>Einführung</h1>'));
});
