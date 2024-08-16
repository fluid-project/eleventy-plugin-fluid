import slugify from "../../node_modules/@11ty/eleventy/src/Filters/Slugify.js";

/**
 * @param  {Object} data - The data object for the current collection item.
 * @param  {String} collectionType - The collection type.
 * @param  {String} collectionSlug - A localized, URL-safe slug for the collection type, used in the generated permalink.
 * @param  {String} paginationSlug - A localized, URL-safe slug for paginated URLs such as /page/2, used in the generated permalink.
 *
 * @return {String} - The generated permalink.
 */
const generatePermalink = (data, collectionType, collectionSlug, paginationSlug = "page") => {
    /* If this post is a "stub" with no localized title, we assume it does not exist and prevent it from building. */
    if (!data.hasOwnProperty("title")) {
        return false;
    }

    // const eleventyConfig = new UserConfig();
    const locale = data.locale || data.defaultLanguage;
    const langSlug = data.supportedLanguages[locale].slug || locale;
    collectionSlug = collectionSlug || collectionType;

    if (collectionType === "pages") {

        /* If the page is a 404 page, return 404.html, optionally prepended with the language code. */
        if (data.page.fileSlug === "404") {
            return (locale === data.defaultLanguage) ? "/404.html" : `/${langSlug}/404.html`;
        }

        /** If the page is the index page, the base path, optionally prepended with the language code. */
        if (data.page.fileSlug === locale || data.page.inputPath.endsWith("index.md")) {
            return (locale === data.defaultLanguage) ? "/" : `/${langSlug}/`;
        }

        /* If the page is not the index page, return the page title in a URL-safe format, optionally prepended with the language code. */
        const slug = data.slug || slugify(data.title);
        if (data.hasOwnProperty("pagination") && data.pagination.pageNumber > 0) {
            return (locale === data.defaultLanguage) ? `/${slug}/${paginationSlug}/${data.pagination.pageNumber + 1}/` : `/${langSlug}/${slug}/${paginationSlug}/${data.pagination.pageNumber + 1}/`;
        }
        return (locale === data.defaultLanguage) ? `/${slug}/` : `/${langSlug}/${slug}/`;
    } else {
        const slug = data.slug || slugify(data.title);
        return (locale === data.defaultLanguage) ? `/${collectionSlug}/${slug}/` : `/${langSlug}/${collectionSlug}/${slug}/`;
    }
};

export default generatePermalink;
