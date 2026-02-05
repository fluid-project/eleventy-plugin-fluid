/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New B SD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/

export default function findTranslationFilter(page, collection = [], lang, desiredLang) {
    const expectedFilePathStem = page.filePathStem.replace(lang, desiredLang);

    let translationUrl = false;

    for (const element of collection) {
        if (element.filePathStem === expectedFilePathStem) {
            translationUrl = element.url;
        }
    }

    return translationUrl;
};
