import markdownlintConfig from '@inclusive-design/markdownlint-config';

const config = {
	config: Object.assign(markdownlintConfig.config, {
		'no-hard-tabs': {
			code_blocks: false,
		},
	}),
	ignores: ['node_modules', 'CHANGELOG.md', 'fixtures/**/*.md'],
};

export default config;
