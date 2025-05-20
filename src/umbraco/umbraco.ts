/**
 * Umbraco Delivery API
 * You can find out more about the Umbraco Delivery API in [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api).
 */
import type { Bindings } from '@/app'
import { Hono } from 'hono'
import { apiKeyMiddleware } from './umbraco.middleware'

import { getContentHandlers } from '@/umbraco/handlers/getContent'
import { getContentItemByIdHandlers } from './handlers/getContentItemById'
import { getContentItemByPathHandlers } from './handlers/getContentItemByPath'
import { getContentItemsHandlers } from './handlers/getContentItems'
import { getMediaHandlers } from './handlers/getMedia'
import { getMediaItemByIdHandlers } from './handlers/getMediaItemById'
import { getMediaItemByPathHandlers } from './handlers/getMediaItemByPath'
import { getMediaItemsHandlers } from './handlers/getMediaItems'
import { getNavigationItemsHandlers } from './handlers/getNavigationItems'
import { getTranslationsItemsHandlers } from './handlers/getTranslationsItems'

const umbracoApi = new Hono<{
	Bindings: Bindings
}>()

// Apply middleware to all routes
umbracoApi.use('*', async (c, next) => {
	// Get the API key from environment
	const apiKey = c.env.UMBRACO_API_KEY
	if (!apiKey) {
		console.warn('UMBRACO_API_KEY environment variable is not set')
	}

	// Apply the middleware
	return apiKeyMiddleware(apiKey)(c, next)
})

umbracoApi.get('/content-api/content', ...getContentHandlers)
umbracoApi.get('/content-api/content/item/:path', ...getContentItemByPathHandlers)
umbracoApi.get('/content-api/content/item/:id', ...getContentItemByIdHandlers)
umbracoApi.get('/content-api/content/items', ...getContentItemsHandlers)
umbracoApi.get('/content-api/media', ...getMediaHandlers)
umbracoApi.get('/content-api/media/item/:path', ...getMediaItemByPathHandlers)
umbracoApi.get('/content-api/media/item/:id', ...getMediaItemByIdHandlers)
umbracoApi.get('/content-api/media/items', ...getMediaItemsHandlers)
umbracoApi.get('/content-api/navigation/items', ...getNavigationItemsHandlers)
umbracoApi.get('/content-api/translations/items', ...getTranslationsItemsHandlers)

export default umbracoApi
