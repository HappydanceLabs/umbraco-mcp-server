import { GetMediaItemByIdContext } from '@/umbraco/umbraco.context'
import { zValidator } from '@/umbraco/umbraco.validator'
import { getMediaItemByIdParams, getMediaItemByIdQueryParams, getMediaItemByIdResponse } from '@/umbraco/umbraco.zod'
import { createFactory } from 'hono/factory'
import { createUmbracoHandler } from '../umbraco.factory'
const factory = createFactory()

export const getMediaItemByIdHandlers = factory.createHandlers(
	zValidator('param', getMediaItemByIdParams),
	zValidator('query', getMediaItemByIdQueryParams),
	zValidator('response', getMediaItemByIdResponse),
	createUmbracoHandler<GetMediaItemByIdContext>({
		endpoint: '/umbraco/delivery/api/v2/media/item',
		paramName: 'id'
	})
)
