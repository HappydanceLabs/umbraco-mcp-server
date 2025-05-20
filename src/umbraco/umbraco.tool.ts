import { UmbracoClient } from './umbraco.client'

export function createUmbracoTool(endpoint: string, paramName?: string) {
	return async (
		{
			path,
			id,
			query = {}
		}: {
			path?: string
			id?: string
			query?: Record<string, string | string[]>
		},
		context: { env?: any }
	) => {
		try {
			// Check if env is available
			if (!context || !context.env) {
				console.error('Environment not available in MCP tool')
				return {
					content: [
						{
							type: 'text',
							text: 'Configuration error: Environment variables not available'
						}
					]
				}
			}

			const { env } = context

			// Check for required environment variables
			if (!env.UMBRACO_BASE_URL) {
				console.error('UMBRACO_BASE_URL environment variable is not set')
				return {
					content: [
						{
							type: 'text',
							text: 'Configuration error: UMBRACO_BASE_URL environment variable is not set'
						}
					]
				}
			}

			if (!env.UMBRACO_API_KEY) {
				console.error('UMBRACO_API_KEY environment variable is not set')
				return {
					content: [
						{
							type: 'text',
							text: 'Configuration error: UMBRACO_API_KEY environment variable is not set'
						}
					]
				}
			}

			const client = new UmbracoClient({
				baseUrl: env.UMBRACO_BASE_URL,
				apiKey: env.UMBRACO_API_KEY
			})

			let finalEndpoint = endpoint

			// Add path or id parameter if specified
			if (paramName) {
				const paramValue = paramName === 'path' ? path : id
				if (paramValue) {
					finalEndpoint = `${endpoint}/${encodeURIComponent(paramValue)}`
				}
			}

			// Build query string
			const searchParams = new URLSearchParams()
			Object.entries(query).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
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

			// Make the request to Umbraco
			const data = await client.fetch(`${finalEndpoint}${queryString}`)

			return {
				content: [{ type: 'text', text: JSON.stringify(data) }]
			}
		} catch (error) {
			console.error(`Error in Umbraco tool (${endpoint}):`, error)
			return {
				content: [
					{
						type: 'text',
						text: `Error fetching from Umbraco API: ${error instanceof Error ? error.message : 'Unknown error'}`
					}
				]
			}
		}
	}
}
