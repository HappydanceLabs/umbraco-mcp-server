import { GetMediaContext } from '@/umbraco/umbraco.context'
import { zValidator } from '@/umbraco/umbraco.validator'
import { getMediaQueryParams, getMediaResponse } from '@/umbraco/umbraco.zod'
import { createFactory } from 'hono/factory'
import { createUmbracoHandler } from '../umbraco.factory'
const factory = createFactory()

export const getMediaHandlers = factory.createHandlers(
	zValidator('query', getMediaQueryParams),
	zValidator('response', getMediaResponse),
	createUmbracoHandler<GetMediaContext>({
		endpoint: '/umbraco/delivery/api/v2/media'
	})
)
