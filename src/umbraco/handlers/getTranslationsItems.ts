import { GetTranslationsItemsContext } from '@/umbraco/umbraco.context'
import { zValidator } from '@/umbraco/umbraco.validator'
import { getTranslationsItemsResponse } from '@/umbraco/umbraco.zod'
import { createFactory } from 'hono/factory'
import { createUmbracoHandler } from '../umbraco.factory'

const factory = createFactory()

export const getTranslationsItemsHandlers = factory.createHandlers(
	zValidator('response', getTranslationsItemsResponse),
	createUmbracoHandler<GetTranslationsItemsContext>({
		endpoint: '/umbraco/delivery/api/v2/translations/items'
	})
)
