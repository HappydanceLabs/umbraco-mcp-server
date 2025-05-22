import { bindUmbracoEnv } from '@/api/umbraco/clients/umbraco-client'
import app, { Bindings } from '@/app'
import { ResourceFactory } from '@/resources'
import { ToolFactory } from '@/tools'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { McpAgent } from 'agents/mcp'
import z from 'zod'

export class HappyDanceUmbracoMCP extends McpAgent {
	server = new McpServer({
		name: 'HappyDance-Umbraco-MCP',
		version: '1.0.0'
	})

	async init() {
		ToolFactory(this.server)
		ResourceFactory(this.server)
		this.server.tool(
			'checkUmbracoEnvironment',
			'Check available Umbraco environment variables',
			{},
			() => {
				try {
					// Type assertion to ensure we can access environment variables
					const umbracoEnv = this.env as {
						UMBRACO_BASE_URL?: string
						UMBRACO_API_KEY?: string
					}
					return {
						content: [
							{
								type: 'text',
								text: `Available Umbraco environment keys:
								UMBRACO_BASE_URL: ${umbracoEnv.UMBRACO_BASE_URL || 'not set'}
								UMBRACO_API_KEY: ${umbracoEnv.UMBRACO_API_KEY ? 'set (hidden)' : 'not set'}`
							}
						]
					}
				} catch (error: any) {
					return {
						structuredContent: { error: 'Failed to fetch environment variables' },
						content: [
							{
								type: 'text',
								text: `Fetching environment variables failed: ${error}`
							}
						]
					}
				}
			}
		)

		this.server.tool('fetch-weather', { city: z.string() }, async ({ city }) => {
			const response = await fetch(`https://api.weather.com/${city}`)
			const data = await response.text()
			return {
				content: [{ type: 'text', text: data }]
			}
		})
	}
}

export default {
	async fetch(request: Request, env: Bindings, ctx: ExecutionContext) {
		bindUmbracoEnv(env)
		console.log('Method:', request.method, 'URL:', request.url)
		const url = new URL(request.url)
		if (url.pathname === '/mcp') {
			return HappyDanceUmbracoMCP.serve('/mcp').fetch(request, env, ctx)
		}
		if (url.pathname === '/sse') {
			return HappyDanceUmbracoMCP.serve('/sse').fetch(request, env, ctx)
		}
		return app.fetch(request, env, ctx)
	}
}
