import { GetContentItemByPathContext } from '@/umbraco/umbraco.context'
import { zValidator } from '@/umbraco/umbraco.validator'
import { getContentItemByPathParams, getContentItemByPathQueryParams, getContentItemByPathResponse } from '@/umbraco/umbraco.zod'
import { createFactory } from 'hono/factory'
import { createUmbracoHandler } from '../umbraco.factory'

const factory = createFactory()

export const getContentItemByPathHandlers = factory.createHandlers(
	zValidator('param', getContentItemByPathParams),
	zValidator('query', getContentItemByPathQueryParams),
	zValidator('response', getContentItemByPathResponse),
	createUmbracoHandler<GetContentItemByPathContext>({
		endpoint: '/umbraco/delivery/api/v2/content/item',
		paramName: 'path'
	})
)
