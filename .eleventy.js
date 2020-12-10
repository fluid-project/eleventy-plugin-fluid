"use strict";

const fluidPlugin = require('./index.js');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(fluidPlugin);

    return {
        dir: {
            input: "src",
            output: "dist",
            includes: "_includes"
        },
        passthroughFileCopy: true
    };
};
