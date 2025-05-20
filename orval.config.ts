import { defineConfig } from 'orval'

export default defineConfig({
	umbraco: {
		output: {
			mode: 'split',
			target: './src/umbraco/umbraco.ts',
			baseUrl: 'https://dev-nationalgrid.happydance.dev',
			client: 'hono',
			override: {
				hono: {
					handlers: './src/umbraco/handlers'
				},
				zod: {
					strict: {
						response: true
					},
					preprocess: {
						response: {
							name: 'stripNill',
							path: './src/mutators.ts'
						}
					}
				}
			}
		},
		input: {
			target: './openapi/NationalGrid-v2.yaml'
		}
	}
})
