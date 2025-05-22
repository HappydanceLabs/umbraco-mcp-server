// src/resources/content/get-content-item-by-id-resource.ts
import { getContentItemById20 } from '@/api/umbraco/content-delivery/content/content'
import { CreateUmbracoReadResource } from '@/helpers/create-umbraco-read-resource'

export const GetContentItemByIdResource = CreateUmbracoReadResource(
	'Get Content Item By ID',
	'Fetch a specific content item by its UUID',
	'umbraco://content/item',
	async (uri, variables, id) => {
		try {
			console.log('getContentItemById20', uri)
			const response = await getContentItemById20(id || '', variables)

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
