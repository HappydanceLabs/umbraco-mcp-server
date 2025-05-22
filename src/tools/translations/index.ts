// src/tools/translations/get-translations-items-tool.ts
import { CreateUmbracoTool } from '@/helpers/create-umbraco-tool'
import { GetTranslationsItemsResource } from '@/resources/translations'

export const GetTranslationsItemsTool = CreateUmbracoTool(
	'getTranslations',
	'Gets translations items from Umbraco Delivery API',
	{}, // No params for this endpoint
	async () => {
		const resource = await GetTranslationsItemsResource().handler(
			new URL('umbraco://translations/items')
		)
		return {
			content: [
				{
					type: 'text',
					text: resource.contents[0].text as string,
					mimeType: 'application/json'
				}
			]
		}
	}
)

export const TranslationsTools = [GetTranslationsItemsTool]
