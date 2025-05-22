import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{
		ignores: [
			'node_modules',
			'.cursor/*',
			'**/dist/',
			'.vscode/*',
			'.wrangler',
			'.mcp-auth/*',
			'umbraco-old'
		]
	},
	eslint.configs.recommended,
	tseslint.configs.recommended,
	eslintPluginPrettierRecommended,
	{
		rules: {
			'no-console': 'off',
			indent: [
				'error',
				'tab',
				{
					SwitchCase: 1,
					offsetTernaryExpressions: true,
					offsetSwitchCase: true,
					offsetLogicalOperators: true
				}
			],
			'comma-dangle': 'off',
			'arrow-parens': 'off',
			semi: ['error', 'never'],
			quotes: ['error', 'single'],
			noTabs: 0,
			'prettier/prettier': 'off',
			'@typescript-eslint/no-explicit-any': 'off'
		}
	},
	{
		// disable type-aware linting on JS files
		files: ['**/*.js'],
		extends: [tseslint.configs.disableTypeChecked]
	}
)
