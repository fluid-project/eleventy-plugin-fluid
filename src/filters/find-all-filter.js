/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/

import get from 'just-safe-get';

/**
 * @param {Array} array - An array of objects to search.
 * @param {string} key - The key to compare in each object. Can use dot notation, e.g. item.data.uuid.
 * @param {string} value - The value to search for within the specified object key.
 * @returns {Array} An array of matching object(s) from the input array.
 */
export default function findAllFilter(array = [], key = '', value) {
	return array.filter(item => {
		const keyItem = get(item, key);
		if (Array.isArray(keyItem)) {
			return keyItem.includes(value);
		}

		return keyItem === value;
	});
}
