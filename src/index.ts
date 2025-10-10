import { bindUmbracoEnv } from '@/api/umbraco/clients/umbraco-client'
import { ResourceFactory } from '@/resources'
import { ToolFactory } from '@/tools'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { McpAgent } from 'agents/mcp'
import app from './app'

export type Bindings = Env & {
	UMBRACO_API_KEY: string
	UMBRACO_BASE_URL: string
	WAF_API_KEY: string
}

export class HappyDanceUmbracoMCPV2 extends McpAgent {
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
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url)

		// Handle CORS preflight early and without auth
		if (request.method === 'OPTIONS') {
			const corsHeaders = new Headers({
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
				// Allow Authorization and MCP headers used by transports
				'Access-Control-Allow-Headers':
					'Authorization, Content-Type, Accept, X-Requested-With, MCP-Session-Id',
				'Access-Control-Max-Age': '86400'
			})
			return new Response(null, { status: 204, headers: corsHeaders })
		}

		if (url.pathname === '/') {
			const appResponse = await app.fetch(request, env, ctx)
			return withCORSHeaders(appResponse)
		}

		if (
			url.pathname === '/mcp' //|| url.pathname === '/sse' || url.pathname === '/sse/message'
		) {
			try {
				let res: Response
				// Validate authentication before processing MCP requests (except preflight handled above)
				validateAuth(request, env)

				bindUmbracoEnv(env)

				// if (url.pathname === '/sse' || url.pathname === '/sse/message') {
				// 	res = await HappyDanceUmbracoMCPV2.serveSSE('/sse').fetch(request, env, ctx)
				// 	return withCORSHeaders(res)
				// }

				if (url.pathname === '/mcp') {
					res = await HappyDanceUmbracoMCPV2.serve('/mcp').fetch(request, env, ctx)
					return withCORSHeaders(res)
				}

				res = await app.fetch(request, env, ctx)
				return withCORSHeaders(res)
			} catch (error) {
				if (error instanceof AuthenticationError) {
					return new Response(
						JSON.stringify({
							error: 'Authentication failed',
							message: error instanceof Error ? error.message : 'Unknown error'
						}),
						{
							status: 401,
							headers: { 'Content-Type': 'application/json' }
						}
					)
				}

				// Handle other errors
				return new Response(
					JSON.stringify({
						error: 'Internal server error',
						message: 'An unexpected error occurred'
					}),
					{
						status: 500,
						headers: { 'Content-Type': 'application/json' }
					}
				)
			}
		}

		return withCORSHeaders(new Response('Not found', { status: 404 }))
	}
}

// Custom error for authentication failures
export class AuthenticationError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'AuthenticationError'
	}
}

// Authentication middleware function
export function validateAuth(request: Request, env: Bindings): void {
	const authHeader = request.headers.get('authorization')

	if (!authHeader) {
		throw new AuthenticationError('Missing Authorization header')
	}

	if (!authHeader.startsWith('Bearer ')) {
		throw new AuthenticationError(
			'Invalid Authorization header format. Expected: Bearer <token>'
		)
	}

	const token = authHeader.replace('Bearer ', '')

	if (!env.MCP_AUTH_UUID) {
		throw new AuthenticationError('Server authentication not configured')
	}

	if (token !== env.MCP_AUTH_UUID) {
		throw new AuthenticationError('Invalid authentication token')
	}
}
