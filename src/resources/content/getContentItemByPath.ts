// src/resources/content/get-content-item-by-path-resource.ts
import { getContentItemByPath20 } from '@/api/umbraco/content-delivery/content/content'
import { CreateUmbracoReadResource } from '@/helpers/create-umbraco-read-resource'

export const GetContentItemByPathResource = CreateUmbracoReadResource(
	'Get Content Item By Path',
	'Fetch a specific content item by its URL path',
	'umbraco://content/item',
	async (uri, variables) => {
		try {
			const response = await getContentItemByPath20(variables.path, {
				expand: variables.expand,
				fields: variables.fields
			})
			return {
				contents: [
					{
						uri: uri.href,
						text: JSON.stringify(response, null, 2),
						mimeType: 'application/json'
					}
				]
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: 'Unknown error occurred while fetching items.'
			return {
				isError: true,
				contents: [
					{
						text: JSON.stringify({
							error: 'Failed to search items',
							details: errorMessage
						})
					}
				]
			}
		}
	}
)
