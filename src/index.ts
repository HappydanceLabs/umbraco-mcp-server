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

function withCORSHeaders(res: Response) {
	const corsHeaders = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Max-Age': '86400'
	}
	const newHeaders = new Headers(res.headers)
	for (const [k, v] of Object.entries(corsHeaders)) {
		newHeaders.set(k, v)
	}
	return new Response(res.body, {
		status: res.status,
		statusText: res.statusText,
		headers: newHeaders
	})
}

export default {
	async fetch(request: Request, env: Bindings, ctx: ExecutionContext) {
		if (request.method === 'OPTIONS') {
			return new Response('ok', {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type',
					'Access-Control-Max-Age': '86400'
				}
			})
		}

		bindUmbracoEnv(env)
		console.log('Method:', request.method, 'URL:', request.url)

		const url = new URL(request.url)
		let res: Response

		if (url.pathname === '/mcp') {
			res = await HappyDanceUmbracoMCP.serve('/mcp').fetch(request, env, ctx)
			return withCORSHeaders(res)
		}

		if (url.pathname === '/sse') {
			res = await HappyDanceUmbracoMCP.serve('/sse').fetch(request, env, ctx)
			return withCORSHeaders(res)
		}

		res = await app.fetch(request, env, ctx)
		return withCORSHeaders(res)
	}
}