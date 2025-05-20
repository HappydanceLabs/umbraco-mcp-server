import { GetContentItemByIdContext } from '@/umbraco/umbraco.context'
import { zValidator } from '@/umbraco/umbraco.validator'
import { getContentItemByIdParams, getContentItemByIdQueryParams, getContentItemByIdResponse } from '@/umbraco/umbraco.zod'
import { createFactory } from 'hono/factory'
import { createUmbracoHandler } from '../umbraco.factory'
const factory = createFactory()

export const getContentItemByIdHandlers = factory.createHandlers(
	zValidator('param', getContentItemByIdParams),
	zValidator('query', getContentItemByIdQueryParams),
	zValidator('response', getContentItemByIdResponse),
	createUmbracoHandler<GetContentItemByIdContext>({
		endpoint: '/umbraco/delivery/api/v2/content/item',
		paramName: 'id'
	})
)
