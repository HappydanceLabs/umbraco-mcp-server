import { CreateUmbracoTool } from '@/helpers/create-umbraco-tool'
import { SearchItemsResource } from '@/resources/search'
import { z } from 'zod'

const GetSearchItemsTool = CreateUmbracoTool(
	'searchContent',
	'Searches for items in Umbraco based on keywords and culture, utilizing the SearchItemsResource.',
	{
		keywords: z.string().optional(),
		culture: z.string().optional()
	},
	async model => {
		try {
			// Construct the URI for the resource based on the model parameters
			const queryParams = new URLSearchParams()
			if (model.keywords) {
				queryParams.append('keywords', model.keywords)
			}
			if (model.culture) {
				queryParams.append('culture', model.culture)
			}
			const resourceUriString = `umbraco://search/items?${queryParams.toString()}`

			// Call the resource handler
			const resourceResponse = await SearchItemsResource().handler(
				new URL(resourceUriString),
				model
			)

			if (resourceResponse.isError)
				throw new Error(resourceResponse.contents[0].text as string)

			return {
				content: resourceResponse.contents.map(item => ({
					type: 'text' as const,
					text: item.text as string,
					isError: item.isError
				}))
			}
		} catch (error) {
			console.log('error', error)
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

export const SearchTools = [GetSearchItemsTool]
