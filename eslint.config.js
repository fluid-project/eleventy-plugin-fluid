import { defineConfig } from 'eslint/config';
import eslintConfigInclusiveDesign from '@inclusive-design/eslint-config';

export default defineConfig([
	{
		extends: [eslintConfigInclusiveDesign],
		rules: {
			camelcase: ['error', { properties: 'never' }],
			'unicorn/no-unsafe-string-replacement': 'off',
			'regexp/prefer-named-capture-group': 'off',
			'regexp/no-super-linear-move': 'off',
		},
	},
	{
		ignores: ['coverage/**', '_site/*'],
	},
]);
