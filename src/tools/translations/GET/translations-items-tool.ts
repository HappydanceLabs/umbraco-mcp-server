// src/tools/translations/get-translations-items-tool.ts
import { CreateUmbracoTool } from '@/helpers/create-umbraco-tool'
import GetTranslationsItemsResource from '@/resources/translations/GET/translations-items-resource'

const GetTranslationsItemsTool = CreateUmbracoTool(
	'get-translations-items',
	'Gets translations items from Umbraco Delivery API',
	{}, // No params for this endpoint
	async () => {
		const resource = await GetTranslationsItemsResource().handler()
		return {
			content: resource.contents.map(item => ({
				type: 'text',
				text: item.text as string
			}))
		}
	}
)
export default GetTranslationsItemsTool
