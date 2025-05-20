import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { McpAgent } from 'agents/mcp'
import { z } from 'zod'
import app from './app'
import { createUmbracoTool } from './umbraco/umbraco.tool'
export class HappyDanceUmbracoMCP extends McpAgent {
	server = new McpServer({
		name: 'HappyDance-Umbraco-MCP',
		version: '1.0.0'
	})

	async init() {
		this.server.tool('checkEnvironment', {}, async (_, { env }) => {
			// Check what environment variables are available
			const keys = Object.keys(env || {}).join(', ')
			const hasUmbracoBaseUrl = !!env?.UMBRACO_BASE_URL
			const hasUmbracoApiKey = !!env?.UMBRACO_API_KEY

			return {
				content: [
					{
						type: 'text',
						text: `Available environment keys: ${keys || 'none'}\nHas UMBRACO_BASE_URL: ${hasUmbracoBaseUrl}\nHas UMBRACO_API_KEY: ${hasUmbracoApiKey}`
					}
				]
			}
		})
		this.server.tool('add', { a: z.number(), b: z.number() }, async ({ a, b }) => ({
			content: [{ type: 'text', text: String(a + b) }]
		}))

		this.server.tool('getContentList', { query: z.record(z.string()).optional() }, createUmbracoTool('/umbraco/delivery/api/v2/content'))

		this.server.tool(
			'getContentById',
			{
				id: z.string(),
				query: z.record(z.string()).optional()
			},
			createUmbracoTool('/umbraco/delivery/api/v2/content/item', 'id')
		)

		this.server.tool(
			'getContentByPath',
			{
				path: z.string(),
				query: z.record(z.string()).optional()
			},
			createUmbracoTool('/umbraco/delivery/api/v2/content/item', 'path')
		)

		this.server.tool('getContentItems', { query: z.record(z.string()).optional() }, createUmbracoTool('/umbraco/delivery/api/v2/content/items'))

		// Media tools
		this.server.tool('getMediaList', { query: z.record(z.string()).optional() }, createUmbracoTool('/umbraco/delivery/api/v2/media'))

		this.server.tool(
			'getMediaById',
			{
				id: z.string(),
				query: z.record(z.string()).optional()
			},
			createUmbracoTool('/umbraco/delivery/api/v2/media/item', 'id')
		)

		this.server.tool(
			'getMediaByPath',
			{
				path: z.string(),
				query: z.record(z.string()).optional()
			},
			createUmbracoTool('/umbraco/delivery/api/v2/media/item', 'path')
		)

		this.server.tool('getMediaItems', { query: z.record(z.string()).optional() }, createUmbracoTool('/umbraco/delivery/api/v2/media/items'))

		// Navigation and translations
		this.server.tool('getNavigationItems', { query: z.record(z.string()).optional() }, createUmbracoTool('/umbraco/delivery/api/v2/navigation/items'))

		this.server.tool('getTranslationItems', { query: z.record(z.string()).optional() }, createUmbracoTool('/umbraco/delivery/api/v2/translations/items'))
	}
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url)
		if (url.pathname === '/mcp') {
			return HappyDanceUmbracoMCP.serve('/mcp').fetch(request, env, ctx)
		}
		return app.fetch(request, env, ctx)
	}
}
