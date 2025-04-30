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
import findFilter from '../src/filters/find-filter.js';

const arr = [
    {
        flavour: 'chocolate',
        scoops: 2,
        waffle: true
    },
    {
        flavour: 'vanilla',
        scoops: 1,
        waffle: false
    }
];

test("Object in array can be found by string property value", () => {
    assert.deepStrictEqual(findFilter(arr, 'flavour', 'chocolate'), {
        flavour: 'chocolate',
        scoops: 2,
        waffle: true
    });
});

test("Object in array can be found by integer property value", () => {
    assert.deepStrictEqual(findFilter(arr, 'scoops', 1), {
        flavour: 'vanilla',
        scoops: 1,
        waffle: false
    });
});

test("Object in array can be found by boolean property value", () => {
    assert.deepStrictEqual(findFilter(arr, 'waffle', true), {
        flavour: 'chocolate',
        scoops: 2,
        waffle: true
    });
});