import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.recommendedTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		}
	},
	eslintPluginPrettierRecommended,
	{
		rules: {
			'no-console': 'off',
			indent: [
				'error',
				'tab',
				{
					SwitchCase: 1,
					offsetTernaryExpressions: true
				}
			],
			'comma-dangle': 'off',
			'arrow-parens': 'off',
			semi: ['error', 'never'],
			quotes: ['error', 'single'],
			noTabs: 0,
			'@typescript-eslint/no-explicit-any': 'off',
			'prettier/prettier': 'off'
		}
	},
	{
		ignores: ['node_modules', '.cursor/*', '**/dist/', '.vscode/*', '.wrangler', '.mcp-auth/*']
	}
)
