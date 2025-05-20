import { GetContentContext } from '@/umbraco/umbraco.context'
import { zValidator } from '@/umbraco/umbraco.validator'
import { getContentQueryParams, getContentResponse } from '@/umbraco/umbraco.zod'
import { createFactory } from 'hono/factory'
import { createUmbracoHandler } from '../umbraco.factory'

const factory = createFactory()

export const getContentHandlers = factory.createHandlers(
	zValidator('query', getContentQueryParams),
	zValidator('response', getContentResponse),
	createUmbracoHandler<GetContentContext>({
		endpoint: '/umbraco/delivery/api/v2/content'
	})
)
