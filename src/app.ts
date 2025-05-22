import type { OAuthHelpers } from '@cloudflare/workers-oauth-provider'
import { Hono } from 'hono'
import auth from './auth'
// import umbraco from './umbraco/umbraco'
import { homeContent, layout } from './utils'

export type Bindings = Env & {
	OAUTH_PROVIDER: OAuthHelpers
	UMBRACO_API_KEY: string
	UMBRACO_BASE_URL: string
	WAF_API_KEY: string
}

const app = new Hono<{
	Bindings: Bindings
}>()

// Render a basic homepage placeholder to make sure the app is up
app.get('/', async c => {
	const content = await homeContent(c.req.raw)
	return c.html(layout(content, 'MCP Remote Auth Demo - Home'))
})

app.route('', auth)
// app.route('', umbraco)
app.notFound(c => {
	return c.html(layout('<h1>404 - Page Not Found</h1><p>The requested resource was not found.</p>', 'Not Found'), 404)
})

export default app
