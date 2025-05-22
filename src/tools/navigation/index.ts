// src/tools/navigation/get-navigation-items-tool.ts
import { CreateUmbracoTool } from '@/helpers/create-umbraco-tool'
import { GetNavigationItemsResource } from '@/resources/navigation'

export const GetNavigationItemsTool = CreateUmbracoTool(
	'GetSiteMap',
	'Gets the overal site structure from Umbraco Delivery API',
	{}, // No params for this endpoint
	async () => {
		// Call the resource handler directly (or via exported function)
		const resource = await GetNavigationItemsResource().handler(
			new URL('umbraco://navigation/items')
		)
		return {
			content: resource.contents.map(item => ({
				type: 'text',
				text: item.text as string
			}))
		}
	}
)
export const NavigationTools = [GetNavigationItemsTool]
