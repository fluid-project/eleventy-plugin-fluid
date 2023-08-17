/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
"use strict";

const test = require("ava");
const merge = require("@11ty/eleventy/src/Util/Merge.js");

test("Passing false replaces an original value", function (t) {
    t.deepEqual(merge({browserslist: "> 2%"}, {browserslist: false}), {browserslist: false});
});

test("Passing key with override prefix overrides an original value", function (t) {
    t.deepEqual(merge({browserslist: "> 2%"}, {"override:browserslist": "> 1%"}), {browserslist: "> 1%"});
});

test("Nested objects can be merged", function (t) {
    t.deepEqual(merge({drafts: {nesting: true}}, {drafts: {customMedia: true}}), {drafts: {nesting: true, customMedia: true}});
});

test("Nested objects can be overriden", function (t) {
    t.deepEqual(merge({drafts: {nesting: true}}, {"override:drafts": {customMedia: true}}), {drafts: {customMedia: true}});
});

test("Nested arrays can be merged", function (t) {
    t.deepEqual(merge({browserslist: ["ie 8", "ie 9"]}, {browserslist: ["ie 7"]}), {browserslist: ["ie 8", "ie 9", "ie 7"]});
});

test("Nested arrays can be overridden", function (t) {
    t.deepEqual(merge({browserslist: ["ie 8", "ie 9"]}, {"override:browserslist": ["ie 7"]}), {browserslist: ["ie 7"]});
});
