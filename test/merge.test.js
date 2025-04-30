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
import eleventyUtils from "@11ty/eleventy-utils";

test("Passing false replaces an original value", () => {
    assert.deepStrictEqual(eleventyUtils.Merge({browserslist: "> 2%"}, {browserslist: false}), {browserslist: false});
});

test("Passing key with override prefix overrides an original value", () => {
    assert.deepStrictEqual(eleventyUtils.Merge({browserslist: "> 2%"}, {"override:browserslist": "> 1%"}), {browserslist: "> 1%"});
});

test("Nested objects can be merged", () => {
    assert.deepStrictEqual(eleventyUtils.Merge({drafts: {nesting: true}}, {drafts: {customMedia: true}}), {drafts: {nesting: true, customMedia: true}});
});

test("Nested objects can be overriden", () => {
    assert.deepStrictEqual(eleventyUtils.Merge({drafts: {nesting: true}}, {"override:drafts": {customMedia: true}}), {drafts: {customMedia: true}});
});

test("Nested arrays can be merged", () =>{
    assert.deepStrictEqual(eleventyUtils.Merge({browserslist: ["ie 8", "ie 9"]}, {browserslist: ["ie 7"]}), {browserslist: ["ie 8", "ie 9", "ie 7"]});
});

test("Nested arrays can be overridden", () => {
    assert.deepStrictEqual(eleventyUtils.Merge({browserslist: ["ie 8", "ie 9"]}, {"override:browserslist": ["ie 7"]}), {browserslist: ["ie 7"]});
});
