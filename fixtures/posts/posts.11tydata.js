import { generatePermalink, __ } from "../../index.js";

export default {
    layout: "layouts/base.njk",
    tags: ["posts"],
    eleventyComputed: {
        permalink: data => {
            if (data.hasOwnProperty("lang") || data.hasOwnProperty("translations")) {
                return generatePermalink(data, "posts", __("posts", {}, data));
            }

            return generatePermalink(data, "posts", "posts");
        }
    }
};
