// src/resources/navigation/get-navigation-items-resource.ts
import { getUmbracoDeliveryApiV2NavigationItems } from '@/api/umbraco/content-delivery/navigation/navigation' // path as generated
import { CreateUmbracoReadResource } from '@/helpers/create-umbraco-read-resource'

// Optionally type args if you want query params, here we don’t need them
export const GetNavigationItemsResource = CreateUmbracoReadResource(
	'get-navigation-items',
	'Reads the navigation items from Umbraco Delivery API',
	'umbraco://navigation/items',
	async uri => {
		try {
			const response = await getUmbracoDeliveryApiV2NavigationItems()
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

export const NavigationResources = [GetNavigationItemsResource]
