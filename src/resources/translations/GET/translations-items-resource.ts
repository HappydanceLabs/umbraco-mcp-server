// src/resources/translations/get-translations-items-resource.ts
import { getUmbracoDeliveryApiV2TranslationsItems } from '@/api/umbraco/content-delivery/translations/translations'
import { CreateUmbracoReadResource } from '@/helpers/create-umbraco-read-resource'

const GetTranslationsItemsResource = CreateUmbracoReadResource(
	'Get Translations Items',
	'Reads the translations items from Umbraco Delivery API',
	'umbraco://translations/items',
	async () => {
		try {
			const response = await getUmbracoDeliveryApiV2TranslationsItems()
			return {
				contents: [
					{
						uri: 'umbraco://translations/items',
						type: 'text',
						text: JSON.stringify(response, null, 2) // JSON as string
					}
				]
			}
		} catch (error) {
			console.error('Error fetching translations items:', error)
			return {
				contents: [
					{
						uri: 'umbraco://translations/items',
						type: 'text',
						text: 'Error fetching translations items'
					}
				]
			}
		}
	}
)

export default GetTranslationsItemsResource
