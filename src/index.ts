import { bindUmbracoEnv } from '@/api/umbraco/clients/umbraco-client'
import app, { Bindings } from '@/app'
import { ResourceFactory } from '@/resources'
import { ToolFactory } from '@/tools'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { McpAgent } from 'agents/mcp'

export class HappyDanceUmbracoMCP extends McpAgent {
	server = new McpServer({
		name: 'HappyDance-Umbraco-MCP',
		version: '1.0.0'
	})

	async init() {
		ToolFactory(this.server)
		ResourceFactory(this.server)
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
