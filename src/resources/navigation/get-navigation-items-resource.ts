// src/resources/navigation/get-navigation-items-resource.ts
import { getUmbracoDeliveryApiV2NavigationItems } from '@/api/umbraco/content-delivery/navigation/navigation' // path as generated
import { CreateUmbracoReadResource } from '@/helpers/create-umbraco-read-resource'

// Optionally type args if you want query params, here we don’t need them
const GetNavigationItemsResource = CreateUmbracoReadResource(
	'Get Navigation Items',
	'Reads the navigation items from Umbraco Delivery API',
	'umbraco://navigation/items',
	async () => {
		try {
			const response = await getUmbracoDeliveryApiV2NavigationItems()
			return {
				contents: [
					{
						uri: 'umbraco://navigation/items',
						type: 'text',
						text: JSON.stringify(response, null, 2) // JSON as string
					}
				]
			}
		} catch (error) {
			console.error('Error fetching navigation items:', error)
			return {
				contents: [
					{
						uri: 'umbraco://navigation/items',
						type: 'text',
						text: 'Error fetching navigation items'
					}
				]
			}
		}
	}
)

export default GetNavigationItemsResource
