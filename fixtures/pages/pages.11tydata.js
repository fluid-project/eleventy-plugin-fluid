
import {generatePermalink} from '../../index.js';

const pages = {
	layout: 'layouts/base.njk',
	permalink: data => generatePermalink(data, 'pages'),
};

export default pages;
