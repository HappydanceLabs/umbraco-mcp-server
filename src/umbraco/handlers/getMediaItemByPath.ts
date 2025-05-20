import { GetMediaItemByPathContext } from '@/umbraco/umbraco.context'
import { zValidator } from '@/umbraco/umbraco.validator'
import { getMediaItemByPathParams, getMediaItemByPathQueryParams, getMediaItemByPathResponse } from '@/umbraco/umbraco.zod'
import { createFactory } from 'hono/factory'
import { createUmbracoHandler } from '../umbraco.factory'

const factory = createFactory()

export const getMediaItemByPathHandlers = factory.createHandlers(
	zValidator('param', getMediaItemByPathParams),
	zValidator('query', getMediaItemByPathQueryParams),
	zValidator('response', getMediaItemByPathResponse),
	createUmbracoHandler<GetMediaItemByPathContext>({
		endpoint: '/umbraco/delivery/api/v2/media/item',
		paramName: 'path'
	})
)
