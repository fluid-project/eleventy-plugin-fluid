import {generatePermalink, __} from '../../index.js';

export default {
	layout: 'layouts/base.njk',
	tags: ['posts'],
	eleventyComputed: {
		permalink(data) {
			if (Object.hasOwn(data, 'lang') || Object.hasOwn(data, 'translations')) {
				return generatePermalink(data, 'posts', __('posts', {}, data));
			}

			return generatePermalink(data, 'posts', 'posts');
		},
	},
};
