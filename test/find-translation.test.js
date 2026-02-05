/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/

import assert from "node:assert";
import test from "node:test";
import findTranslationFilter from "../src/filters/find-translation-filter.js";

const posts = [
    {
        filePathStem: "/en/chocolate.md",
        url: "/en/chocolate/"
    },
    {
        filePathStem: "/fr/chocolate.md",
        url: "/fr/chocolat/"
    }
];

test("Object in array can be found by string property value", () => {
    const chocolate = {
        filePathStem: "/en/chocolate.md",
        url: "/en/chocolate/"
    };
    assert.strictEqual(findTranslationFilter(chocolate, posts, "en", "fr"), "/fr/chocolat/");
});
