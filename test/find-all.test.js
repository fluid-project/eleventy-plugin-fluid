/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/

import assert from 'node:assert';
import test from 'node:test';
import findAllFilter from '../src/filters/find-all-filter.js';

const array = [
	{
		flavour: 'chocolate',
		scoops: 2,
		waffle: true,
	},
	{
		flavour: 'vanilla',
		scoops: 1,
		waffle: false,
	},
	{
		flavour: ['chocolate', 'vanilla', 'coffee'],
		scoops: 1,
		waffle: true,
	},
];

const deepArray = [
	{
		data: {
			lang: 'en',
			title: 'English page',
		},
	},
	{
		data: {
			lang: 'fr',
			title: 'page français',
		},
	},
];

test('Object in array can be found by string property value', () => {
	assert.deepStrictEqual(findAllFilter(array, 'flavour', 'chocolate'), [
		{
			flavour: 'chocolate',
			scoops: 2,
			waffle: true,
		},
		{
			flavour: ['chocolate', 'vanilla', 'coffee'],
			scoops: 1,
			waffle: true,
		},
	]);
});

test('Objects in deep array can be found by string property value', () => {
	assert.deepStrictEqual(findAllFilter(deepArray, 'data.lang', 'en'), [{
		data: {
			lang: 'en',
			title: 'English page',
		},
	}]);
});

test('Object in array can be found by integer property value', () => {
	assert.deepStrictEqual(findAllFilter(array, 'scoops', 1), [
		{
			flavour: 'vanilla',
			scoops: 1,
			waffle: false,
		},
		{
			flavour: ['chocolate', 'vanilla', 'coffee'],
			scoops: 1,
			waffle: true,
		},
	]);
});

test('Object in array can be found by boolean property value', () => {
	assert.deepStrictEqual(findAllFilter(array, 'waffle', true), [
		{
			flavour: 'chocolate',
			scoops: 2,
			waffle: true,
		},
		{
			flavour: ['chocolate', 'vanilla', 'coffee'],
			scoops: 1,
			waffle: true,
		},
	]);
});

test('Object in array can have array values and the object can be bound by contained value', () => {
	assert.deepStrictEqual(findAllFilter(array, 'flavour', 'coffee'), [
		{
			flavour: ['chocolate', 'vanilla', 'coffee'],
			scoops: 1,
			waffle: true,
		},
	]);
});
