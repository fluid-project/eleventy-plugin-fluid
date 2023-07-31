"use strict";

const { EleventyI18nPlugin } = require("@11ty/eleventy");
const i18n = require("eleventy-plugin-i18n-gettext");
const languages = require("../config/languages.json");
const TemplateConfig = require("@11ty/eleventy/src/TemplateConfig.js");

module.exports = (data, collectionType, collectionSlug) => {
    /* If this post is a "stub" with no localized title, we assume it does not exist and prevent it from building. */
    if (!data.hasOwnProperty("title")) {
        return false;
    }

    const lang = EleventyI18nPlugin.LangUtils.getLanguageCodeFromInputPath(data.page.inputPath);
    const locale = lang;
    const langSlug = languages[lang].slug || lang;
    collectionSlug = collectionSlug || collectionType;
    const eleventyConfig = new TemplateConfig();
    const slugify = eleventyConfig.userConfig.getFilter("slugify");

    if (collectionType === "pages") {
        /* If the page is a 404 page, return 404.html, optionally prepended with the language code. */
        if (data.page.fileSlug === "404") {
            return (lang === data.defaultLanguage) ? "/404.html" : `/${langSlug}/404.html`;
        }

        /** If the page is the index page, the base path, optionally prepended with the language code. */
        if (data.page.fileSlug === lang) {
            return (lang === data.defaultLanguage) ? "/" : `/${langSlug}/`;
        }

        /* If the page is not the index page, return the page title in a URL-safe format, optionally prepended with the language code. */
        const slug = slugify(data.title);
        if (data.hasOwnProperty("pagination") && data.pagination.pageNumber > 0) {
            return (lang === data.defaultLanguage) ? `/${slug}/${i18n._(locale, "page")}/${data.pagination.pageNumber + 1}/` : `/${langSlug}/${slug}/${i18n._(locale, "page")}/${data.pagination.pageNumber + 1}/`;
        }
        return (lang === data.defaultLanguage) ? `/${slug}/` : `/${langSlug}/${slug}/`;
    } else {
        const slug = slugify(data.title);
        return (lang === data.defaultLanguage) ? `/${collectionSlug}/${slug}/` : `/${langSlug}/${collectionSlug}/${slug}/`;
    }
};
