/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/

"use strict";

const fluidPlugin = require('./index.js');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(fluidPlugin);

    return {
        dir: {
            input: "test",
            output: "dist",
        },
        passthroughFileCopy: true
    };
};
