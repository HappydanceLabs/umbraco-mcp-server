import { getContent20 } from '@/api/umbraco/content-delivery/content/content'
import { CreateUmbracoReadResource } from '@/helpers/create-umbraco-read-resource'

export const GetContentResource = CreateUmbracoReadResource(
	'Get Content',
	'Fetch paginated content items from Umbraco Delivery API',
	'umbraco://content',
	async (uri, variables) => {
		try {
			const response = await getContent20(variables)
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
