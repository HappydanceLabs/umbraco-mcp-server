import { CreateUmbracoTool } from '@/helpers/create-umbraco-tool'
import {
	GetContentItemByIdResource,
	GetContentItemByPathResource,
	GetContentResource
} from '@/resources/content'
import { z } from 'zod'

const expandFieldsSchema = {
	expand: z
		.string()
		.optional()
		.describe('Properties that should be expanded in the response')
		.default(
			'properties[contentBlocks,metaTitle,metaKeywords,metaDescription,relatedBlogPosts]'
		),
	fields: z
		.string()
		.optional()
		.describe('Explicitly defines which properties to include')
		.default(
			'properties[contentBlocks,metaTitle,metaKeywords,metaDescription,relatedBlogPosts]'
		)
}

const contentParamsSchema = {
	fetch: z.string().optional().describe('Specifies the content items to fetch'),
	filter: z.string().optional().describe('Defines how to filter the fetched content items'),
	sort: z.string().optional().describe('Sorting query string options for ordering results'),
	skip: z
		.number()
		.optional()
		.describe('Number of content items to skip for pagination')
		.default(0),
	take: z
		.number()
		.optional()
		.describe('Number of content items to take for pagination')
		.default(100),
	...expandFieldsSchema
}

export const GetContentTool = CreateUmbracoTool(
	'getContent',
	'Fetch paginated content items from Umbraco with optional filtering and sorting',
	contentParamsSchema,
	async model => {
		const resource = await GetContentResource().handler(new URL('umbraco://content/'), model)
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

export const GetContentItemByIdTool = CreateUmbracoTool(
	'getContentItemById',
	'Fetch a specific content item by its UUID',
	{
		id: z.string().uuid().describe('The UUID of the content item'),
		...expandFieldsSchema
	},
	async model => {
		try {
			const resource = await GetContentItemByIdResource().handler(
				new URL('umbraco://content/item/'),
				{
					expand: model.expand,
					fields: model.fields
				},
				model.id
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
		} catch (error) {
			console.error('Error in GetContentItemByIdTool:', error)
			const errorMessage =
				error instanceof Error
					? error.message
					: 'Unknown error occurred while fetching content item.'
			return {
				content: [{ type: 'text', text: errorMessage, isError: true }]
			}
		}
	}
)

export const GetContentItemByPathTool = CreateUmbracoTool(
	'getContentItemByPath',
	'Fetch a specific content item by its URL path',
	{
		path: z
			.string()
			.describe(
				'The URL path of the content item including the language, so example: uk/home'
			),
		...expandFieldsSchema
	},
	async model => {
		const resource = await GetContentItemByPathResource().handler(
			new URL('umbraco://content/item/'),
			model
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

export const GetTeamsTool = CreateUmbracoTool(
	'getTeams',
	'Fetch a list of my teams pages and the content items within them',
	expandFieldsSchema,
	async model => {
		const resourceUriString = `umbraco://content/`
		model.filter = ['contentType:team']
		const resource = await GetContentResource().handler(new URL(resourceUriString), model)
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
export const GetHomePageTool = CreateUmbracoTool(
	'getHomePage',
	'Fetch the home page content including all of the content blocks within it',
	expandFieldsSchema,
	async model => {
		const resourceUriString = `umbraco://content/`
		model.filter = ['contentType:home']
		const resource = await GetContentResource().handler(new URL(resourceUriString), model)
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
export const GetBlogPostsTool = CreateUmbracoTool(
	'getBlogPosts',
	'Fetch the blog posts content including all of the content blocks within it',
	expandFieldsSchema,
	async model => {
		const resourceUriString = `umbraco://content/`
		model.filter = ['contentType:blogPost']
		const resource = await GetContentResource().handler(new URL(resourceUriString), model)
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
export const GetLocationsTool = CreateUmbracoTool(
	'getLocations',
	'Fetch the locations content including all of the content blocks within it',
	expandFieldsSchema,
	async model => {
		const resourceUriString = `umbraco://content/`
		model.filter = ['contentType:location']
		const resource = await GetContentResource().handler(new URL(resourceUriString), model)
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
// events
export const GetEventsTool = CreateUmbracoTool(
	'getEvents',
	'Fetch the events content including all of the content blocks within it',
	expandFieldsSchema,
	async model => {
		const resourceUriString = `umbraco://content/`
		model.filter = ['contentType:event']
		const resource = await GetContentResource().handler(new URL(resourceUriString), model)
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

// benefits
export const GetBenefitsTool = CreateUmbracoTool(
	'getBenefits',
	'Fetch the benefits content including all of the content blocks within it',
	expandFieldsSchema,
	async model => {
		const resourceUriString = `umbraco://content/`
		model.filter = ['contentType:widgetIcons&filter=name:Benefits']
		const resource = await GetContentResource().handler(new URL(resourceUriString), model)
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
// How we hire
export const GetHowWeHireTool = CreateUmbracoTool(
	'getHowWeHire',
	'Fetch the how we hire content including all of the content blocks within it',
	expandFieldsSchema,
	async model => {
		const resourceUriString = `umbraco://content/`
		model.filter = ['contentType:widgetIcons&filter=name:Hire']
		const resource = await GetContentResource().handler(new URL(resourceUriString), model)
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

// write a "write to umbraco tool", that simply returns a message "We have updated your content	"
export const WriteToUmbracoTool = CreateUmbracoTool(
	'writeToUmbraco',
	'Write to Umbraco',
	{},
	async model => {
		return {
			content: [{ type: 'text', text: 'We have updated your content', isError: false }]
		}
	}
)

export const ContentTools = [
	GetContentTool,
	GetContentItemByIdTool,
	GetContentItemByPathTool,
	GetTeamsTool,
	GetHomePageTool,
	GetBlogPostsTool,
	GetLocationsTool,
	GetEventsTool,
	GetBenefitsTool,
	GetHowWeHireTool,
	WriteToUmbracoTool
]
