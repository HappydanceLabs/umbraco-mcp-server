// src/tools/navigation/get-navigation-items-tool.ts
import { CreateUmbracoTool } from '@/helpers/create-umbraco-tool'
import GetNavigationItemsResource from '@/resources/navigation/get-navigation-items-resource'

const GetNavigationItemsTool = CreateUmbracoTool(
	'get-navigation-items',
	'Gets navigation items from Umbraco Delivery API',
	{}, // No params for this endpoint
	async () => {
		// Call the resource handler directly (or via exported function)
		const resource = await GetNavigationItemsResource().handler()
		return {
			content: resource.contents.map(item => ({
				type: 'text',
				text: item.text as string
			}))
		}
	}
)

export default GetNavigationItemsTool
