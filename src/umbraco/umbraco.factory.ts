// src/umbraco/utils/handlerFactory.ts
import { Context } from 'hono'
import { getUmbracoClient } from './umbraco.client'

export function createUmbracoHandler<T extends Context>(options: { endpoint: string; paramName?: string }) {
	return async (c: T) => {
		const client = getUmbracoClient(c)
		const params = c.req.param()
		const queryParams = c.req.query()

		// Get param value if paramName is provided
		let pathParam = ''
		if (options.paramName && params[options.paramName]) {
			pathParam = `/${encodeURIComponent(params[options.paramName])}`
		}

		// Build query string from query parameters
		const searchParams = new URLSearchParams()
		Object.entries(queryParams).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				// Handle array values
				if (Array.isArray(value)) {
					value.forEach(v => {
						if (v !== undefined && v !== null) {
							searchParams.append(key, String(v))
						}
					})
				} else {
					searchParams.append(key, String(value))
				}
			}
		})

		const queryString = searchParams.toString() ? `?${searchParams.toString()}` : ''

		try {
			// Use the endpoint from options
			const data = await client.fetch(`${options.endpoint}${pathParam}${queryString}`)

			return c.json(data)
		} catch (error) {
			// Handle error
			if (error instanceof Error) {
				console.error(`Error fetching from ${options.endpoint}${pathParam}:`, error.message)

				// Check if it's a 404 error
				if (error.message.includes('404')) {
					return c.json({ error: 'Resource not found' }, 404)
				}

				// Handle other errors
				return c.json({ error: 'Failed to fetch from Umbraco API' }, 500)
			}

			return c.json({ error: 'An unknown error occurred' }, 500)
		}
	}
}
