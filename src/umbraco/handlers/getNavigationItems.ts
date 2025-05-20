import { GetNavigationItemsContext } from '@/umbraco/umbraco.context'
import { zValidator } from '@/umbraco/umbraco.validator'
import { getNavigationItemsResponse } from '@/umbraco/umbraco.zod'
import { createFactory } from 'hono/factory'
import { createUmbracoHandler } from '../umbraco.factory'

const factory = createFactory()

export const getNavigationItemsHandlers = factory.createHandlers(
	zValidator('response', getNavigationItemsResponse),
	createUmbracoHandler<GetNavigationItemsContext>({
		endpoint: '/umbraco/delivery/api/v2/navigation/items'
	})
)
