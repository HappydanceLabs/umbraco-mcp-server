// src/umbraco/utils/umbracoClient.ts
import type { Bindings } from '@/app'
import { Context } from 'hono'
interface UmbracoClientOptions {
	baseUrl: string
	apiKey: string
}

export class UmbracoClient {
	private baseUrl: string
	private apiKey: string

	constructor(options: UmbracoClientOptions) {
		this.baseUrl = options.baseUrl
		this.apiKey = options.apiKey
	}

	async fetch(path: string, options: RequestInit = {}) {
		const url = `${this.baseUrl}${path}`
		const headers = new Headers(options.headers)

		// Add API key header
		headers.set('api-key', this.apiKey)

		const response = await fetch(url, {
			...options,
			headers
		})

		if (!response.ok) {
			throw new Error(`Umbraco API error: ${response.status} ${response.statusText}`)
		}

		return response.json()
	}
}

// Helper function to get the client from the context
export const getUmbracoClient = (c: Context<{ Bindings: Bindings }>) => {
	const apiKey = c.get('Api-Key') || c.env.UMBRACO_API_KEY
	const baseUrl = c.env.UMBRACO_BASE_URL

	return new UmbracoClient({
		baseUrl,
		apiKey
	})
}
