
import rtlDetect from "rtl-detect";
import { generatePermalink } from "../../index.js";
import i18n from "eleventy-plugin-i18n-gettext";

export default {
    layout: "layouts/base.njk",
    eleventyComputed: {
        langDir: data => rtlDetect.getLangDir(data.locale),
        permalink: data => {
            const locale = data.locale;
            return generatePermalink(data, "posts", i18n._(locale, "posts"));
        }
    }
};
