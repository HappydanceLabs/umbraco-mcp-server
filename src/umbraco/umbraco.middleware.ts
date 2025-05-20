import type { Bindings } from '@/app'
import { MiddlewareHandler } from 'hono'

export const apiKeyMiddleware = (
	apiKey: string
): MiddlewareHandler<{
	Bindings: Bindings
}> => {
	return async (c, next) => {
		// Add the API key to outgoing requests
		c.set('Api-Key', apiKey)
		await next()
	}
}
