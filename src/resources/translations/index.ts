// src/resources/translations/get-translations-items-resource.ts
import { getUmbracoDeliveryApiV2TranslationsItems } from '@/api/umbraco/content-delivery/translations/translations'
import { CreateUmbracoReadResource } from '@/helpers/create-umbraco-read-resource'

export const GetTranslationsItemsResource = CreateUmbracoReadResource(
	'get-translations-items',
	'Reads the translations items from Umbraco Delivery API',
	'umbraco://translations/items',
	async uri => {
		try {
			const response = await getUmbracoDeliveryApiV2TranslationsItems()
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
					: 'Unknown error occurred while searching items.'
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

export const TranslationsResources = [GetTranslationsItemsResource]
