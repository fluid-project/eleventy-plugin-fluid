
import { generatePermalink } from "../../index.js";

export default {
    layout: "layouts/base.njk",
    permalink: data => {
        return generatePermalink(data, "pages");
    }
};
