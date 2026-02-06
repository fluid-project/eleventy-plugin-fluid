/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/

import _ from 'lodash';

/**
 * @param {Array} array - An array of objects to search.
 * @param {string} key - The key to compare in each object.
 * @param {string} value - The value to search for within the specified object key.
 * @returns {object} The first matching object in the array.
 */
export default function findFilter(array = [], key = '', value) {
	return array.find(item => {
		const keyItem = _.get(item, key);
		if (Array.isArray(keyItem)) {
			return keyItem.includes(value);
		}

		return keyItem === value;
	});
}
