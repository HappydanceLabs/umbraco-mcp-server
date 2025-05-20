import { GetMediaItemsContext } from '@/umbraco/umbraco.context'
import { zValidator } from '@/umbraco/umbraco.validator'
import { getMediaItemsQueryParams, getMediaItemsResponse } from '@/umbraco/umbraco.zod'
import { createFactory } from 'hono/factory'
import { createUmbracoHandler } from '../umbraco.factory'

const factory = createFactory()

export const getMediaItemsHandlers = factory.createHandlers(
	zValidator('query', getMediaItemsQueryParams),
	zValidator('response', getMediaItemsResponse),
	createUmbracoHandler<GetMediaItemsContext>({
		endpoint: '/umbraco/delivery/api/v2/media/items'
	})
)
