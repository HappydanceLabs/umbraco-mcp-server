import { GetContentItemsContext } from '@/umbraco/umbraco.context'
import { zValidator } from '@/umbraco/umbraco.validator'
import { getContentItemsQueryParams, getContentItemsResponse } from '@/umbraco/umbraco.zod'
import { createFactory } from 'hono/factory'
import { createUmbracoHandler } from '../umbraco.factory'

const factory = createFactory()

export const getContentItemsHandlers = factory.createHandlers(
	zValidator('query', getContentItemsQueryParams),
	zValidator('response', getContentItemsResponse),
	createUmbracoHandler<GetContentItemsContext>({
		endpoint: '/umbraco/delivery/api/v2/content/items'
	})
)
