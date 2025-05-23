/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * Umbraco Delivery API
 * You can find out more about the Umbraco Delivery API in [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api).
 * OpenAPI spec version: Latest
 */
import { z as zod } from 'zod'

export const getContent20QuerySkipDefault = 0
export const getContent20QueryTakeDefault = 10

export const getContent20QueryParams = zod.object({
	fetch: zod
		.string()
		.optional()
		.describe(
			'Specifies the content items to fetch. Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api#query-parameters) for more details on this.'
		),
	filter: zod
		.array(zod.string())
		.optional()
		.describe(
			'Defines how to filter the fetched content items. Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api#query-parameters) for more details on this.'
		),
	sort: zod
		.array(zod.string())
		.optional()
		.describe(
			'Defines how to sort the found content items. Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api#query-parameters) for more details on this.'
		),
	skip: zod.coerce
		.number()
		.optional()
		.describe(
			'Specifies the number of found content items to skip. Use this to control pagination of the response.'
		),
	take: zod.coerce
		.number()
		.default(getContent20QueryTakeDefault)
		.describe(
			'Specifies the number of found content items to take. Use this to control pagination of the response.'
		),
	expand: zod
		.string()
		.optional()
		.describe(
			'Defines the properties that should be expanded in the response. Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api#query-parameters) for more details on this.'
		),
	fields: zod
		.string()
		.optional()
		.describe(
			'Explicitly defines which properties should be included in the response (by default all properties are included). Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api#query-parameters) for more details on this.'
		)
})

export const getContent20Header = zod.object({
	'Accept-Language': zod
		.string()
		.optional()
		.describe(
			'Defines the language to return. Use this when querying language variant content items.'
		),
	'Api-Key': zod
		.string()
		.optional()
		.describe('API key specified through configuration to authorize access to the API.'),
	Preview: zod.boolean().optional().describe('Whether to request draft content.'),
	'Start-Item': zod.string().optional().describe('URL segment or GUID of a root content item.')
})

export const getContentItemByPath20PathPathDefault = ''

export const getContentItemByPath20Params = zod.object({
	path: zod.string()
})

export const getContentItemByPath20QueryParams = zod.object({
	expand: zod
		.string()
		.optional()
		.describe(
			'Defines the properties that should be expanded in the response. Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api#query-parameters) for more details on this.'
		),
	fields: zod
		.string()
		.optional()
		.describe(
			'Explicitly defines which properties should be included in the response (by default all properties are included). Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api#query-parameters) for more details on this.'
		)
})

export const getContentItemByPath20Header = zod.object({
	'Accept-Language': zod
		.string()
		.optional()
		.describe(
			'Defines the language to return. Use this when querying language variant content items.'
		),
	'Api-Key': zod
		.string()
		.optional()
		.describe('API key specified through configuration to authorize access to the API.'),
	Preview: zod.boolean().optional().describe('Whether to request draft content.'),
	'Start-Item': zod.string().optional().describe('URL segment or GUID of a root content item.')
})

export const getContentItemById20Params = zod.object({
	id: zod.string().uuid()
})

export const getContentItemById20QueryParams = zod.object({
	expand: zod
		.string()
		.optional()
		.describe(
			'Defines the properties that should be expanded in the response. Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api#query-parameters) for more details on this.'
		),
	fields: zod
		.string()
		.optional()
		.describe(
			'Explicitly defines which properties should be included in the response (by default all properties are included). Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api#query-parameters) for more details on this.'
		)
})

export const getContentItemById20Header = zod.object({
	'Accept-Language': zod
		.string()
		.optional()
		.describe(
			'Defines the language to return. Use this when querying language variant content items.'
		),
	'Api-Key': zod
		.string()
		.optional()
		.describe('API key specified through configuration to authorize access to the API.'),
	Preview: zod.boolean().optional().describe('Whether to request draft content.'),
	'Start-Item': zod.string().optional().describe('URL segment or GUID of a root content item.')
})

export const getContentItems20QueryParams = zod.object({
	id: zod.array(zod.string().uuid()).optional(),
	expand: zod
		.string()
		.optional()
		.describe(
			'Defines the properties that should be expanded in the response. Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api#query-parameters) for more details on this.'
		),
	fields: zod
		.string()
		.optional()
		.describe(
			'Explicitly defines which properties should be included in the response (by default all properties are included). Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api#query-parameters) for more details on this.'
		)
})

export const getContentItems20Header = zod.object({
	'Accept-Language': zod
		.string()
		.optional()
		.describe(
			'Defines the language to return. Use this when querying language variant content items.'
		),
	'Api-Key': zod
		.string()
		.optional()
		.describe('API key specified through configuration to authorize access to the API.'),
	Preview: zod.boolean().optional().describe('Whether to request draft content.'),
	'Start-Item': zod.string().optional().describe('URL segment or GUID of a root content item.')
})

export const getMedia20QuerySkipDefault = 0
export const getMedia20QueryTakeDefault = 10

export const getMedia20QueryParams = zod.object({
	fetch: zod
		.string()
		.optional()
		.describe(
			'Specifies the media items to fetch. Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api/media-delivery-api#query-parameters) for more details on this.'
		),
	filter: zod
		.array(zod.string())
		.optional()
		.describe(
			'Defines how to filter the fetched media items. Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api/media-delivery-api#query-parameters) for more details on this.'
		),
	sort: zod
		.array(zod.string())
		.optional()
		.describe(
			'Defines how to sort the found media items. Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api/media-delivery-api#query-parameters) for more details on this.'
		),
	skip: zod.coerce
		.number()
		.optional()
		.describe(
			'Specifies the number of found media items to skip. Use this to control pagination of the response.'
		),
	take: zod.coerce
		.number()
		.default(getMedia20QueryTakeDefault)
		.describe(
			'Specifies the number of found media items to take. Use this to control pagination of the response.'
		),
	expand: zod
		.string()
		.optional()
		.describe(
			'Defines the properties that should be expanded in the response. Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api/media-delivery-api#query-parameters) for more details on this.'
		),
	fields: zod
		.string()
		.optional()
		.describe(
			'Explicitly defines which properties should be included in the response (by default all properties are included). Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api/media-delivery-api#query-parameters) for more details on this.'
		)
})

export const getMedia20Header = zod.object({
	'Api-Key': zod
		.string()
		.optional()
		.describe('API key specified through configuration to authorize access to the API.')
})

export const getMediaItemByPath20Params = zod.object({
	path: zod.string()
})

export const getMediaItemByPath20QueryParams = zod.object({
	expand: zod
		.string()
		.optional()
		.describe(
			'Defines the properties that should be expanded in the response. Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api/media-delivery-api#query-parameters) for more details on this.'
		),
	fields: zod
		.string()
		.optional()
		.describe(
			'Explicitly defines which properties should be included in the response (by default all properties are included). Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api/media-delivery-api#query-parameters) for more details on this.'
		)
})

export const getMediaItemByPath20Header = zod.object({
	'Api-Key': zod
		.string()
		.optional()
		.describe('API key specified through configuration to authorize access to the API.')
})

export const getMediaItemById20Params = zod.object({
	id: zod.string().uuid()
})

export const getMediaItemById20QueryParams = zod.object({
	expand: zod
		.string()
		.optional()
		.describe(
			'Defines the properties that should be expanded in the response. Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api/media-delivery-api#query-parameters) for more details on this.'
		),
	fields: zod
		.string()
		.optional()
		.describe(
			'Explicitly defines which properties should be included in the response (by default all properties are included). Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api/media-delivery-api#query-parameters) for more details on this.'
		)
})

export const getMediaItemById20Header = zod.object({
	'Api-Key': zod
		.string()
		.optional()
		.describe('API key specified through configuration to authorize access to the API.')
})

export const getMediaItems20QueryParams = zod.object({
	id: zod.array(zod.string().uuid()).optional(),
	expand: zod
		.string()
		.optional()
		.describe(
			'Defines the properties that should be expanded in the response. Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api/media-delivery-api#query-parameters) for more details on this.'
		),
	fields: zod
		.string()
		.optional()
		.describe(
			'Explicitly defines which properties should be included in the response (by default all properties are included). Refer to [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api/media-delivery-api#query-parameters) for more details on this.'
		)
})

export const getMediaItems20Header = zod.object({
	'Api-Key': zod
		.string()
		.optional()
		.describe('API key specified through configuration to authorize access to the API.')
})

export const getUmbracoDeliveryApiV2SearchItemsQueryCultureDefault = 'en-GB'

export const getUmbracoDeliveryApiV2SearchItemsQueryParams = zod.object({
	keywords: zod.string().optional(),
	culture: zod.string().default(getUmbracoDeliveryApiV2SearchItemsQueryCultureDefault)
})
