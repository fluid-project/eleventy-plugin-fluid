/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
/**
 * @param {string} string - The string to split.
 * @param {string} delimiter - The delimiter character(s) at which to split the string.
 * @returns {Array} The resulting pieces of the string.
 */
export default function splitFilter(string, delimiter) {
	return string.split(delimiter);
}
