import { getUmbracoDeliveryApiV2SearchItems } from '@/api/umbraco/content-delivery/search/search'
import { getUmbracoDeliveryApiV2SearchItemsQueryParams } from '@/api/umbraco/content-delivery/umbracoDeliveryAPI.zod'
import { CreateUmbracoTemplateResource } from '@/helpers/create-umbraco-template-resource'

export const SearchItemsResource = CreateUmbracoTemplateResource(
	'search-umbraco-items',
	'Searches for items in Umbraco based on keywords and culture.',
	// @ts-ignore
	'umbraco://search/items',
	async (uri, variables) => {
		try {
			const params = getUmbracoDeliveryApiV2SearchItemsQueryParams.parse(variables)
			const response = await getUmbracoDeliveryApiV2SearchItems(params)

			// @ts-ignore
			const searchResultsPaged = response.searchResultsPaged
				? // @ts-ignore
					response.searchResultsPaged
				: response
			return {
				contents: [
					{
						uri: uri.href,
						text: JSON.stringify(searchResultsPaged, null, 2),
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

export const SearchResources = [SearchItemsResource]
