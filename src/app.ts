import { Hono } from 'hono'
import { homeContent, layout } from './utils'

export type Bindings = Env & {
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

app.notFound(c => {
	return c.html(
		layout(
			'<h1>404 - Page Not Found</h1><p>The requested resource was not found.</p>',
			'Not Found'
		),
		404
	)
})

export default app
