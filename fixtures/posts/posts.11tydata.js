import { generatePermalink, __ } from '../../index.js';

const posts = {
	layout: 'layouts/base.njk',
	tags: ['posts'],
	eleventyComputed: {
		permalink(data) {
			return generatePermalink(data, 'posts', Object.hasOwn(data, 'lang') || Object.hasOwn(data, 'translations') ? __('posts', {}, data) : 'posts');
		},
	},
};

export default posts;
