/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/

/**
 * @param {Array} array - An array of items.
 * @param {number} limit - The maximum number of items.
 * @returns {Array} - The truncated array.
 */
export default function limitFilter(array, limit) {
	return array.slice(0, limit);
}
