import { defineConfig } from 'orval'

export default defineConfig({
	umbraco: {
		output: {
			mode: 'tags-split',
			clean: true,
			target: './src/api/umbraco/content-delivery',
			schemas: './src/api/umbraco/content-delivery/schemas',
			client: 'fetch',
			override: {
				mutator: {
					path: './src/api/umbraco/clients/umbraco-client.ts',
					name: 'UmbracoClient'
				}
			}
		},
		input: {
			target: './openapi/NationalGrid-v2.yaml'
		}
	},
	'umbraco-zod': {
		input: {
			target: './openapi/NationalGrid-v2.yaml'
		},
		output: {
			mode: 'split',
			client: 'zod',
			target: './src/api/umbraco/content-delivery/',
			fileExtension: '.zod.ts',
			override: {
				zod: {
					generate: {
						param: true,
						body: true,
						response: false,
						query: true,
						header: true
					},
					dateTimeOptions: {
						local: true
					},
					coerce: {
						query: ['number', 'boolean']
					}
				}
			}
		}
	}
})
