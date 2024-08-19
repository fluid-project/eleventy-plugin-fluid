
import { generatePermalink } from "../../index.js";
import { readFileSync } from "node:fs";
import rosetta from "rosetta";

const translations = JSON.parse(
    readFileSync(
        new URL("../../fixtures/_data/translations.json", import.meta.url)
    )
);
const i18n = rosetta(translations);

export default {
    layout: "layouts/base.njk",
    eleventyComputed: {
        permalink: data => {
            const locale = data.locale;
            i18n.locale(locale);
            return generatePermalink(data, "posts", i18n.t('posts'));
        }
    }
};
