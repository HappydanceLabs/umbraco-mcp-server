import { Hono } from 'hono'
import type { Bindings } from './app'
import { layout, parseApproveFormBody, renderAuthorizationApprovedContent, renderLoggedInAuthorizeScreen, renderLoggedOutAuthorizeScreen } from './utils'

// Create a new Hono app specifically for auth routes
const auth = new Hono<{
	Bindings: Bindings
}>()

// Render an authorization page
// If the user is logged in, we'll show a form to approve the appropriate scopes
// If the user is not logged in, we'll show a form to both login and approve the scopes
auth.get('/invalid_token', async c => {
	// We don't have an actual auth system, so to demonstrate both paths, you can
	// hard-code whether the user is logged in or not. We'll default to true
	// const isLoggedIn = false;
	const isLoggedIn = true

	const oauthReqInfo = await c.env.OAUTH_PROVIDER.parseAuthRequest(c.req.raw)

	const oauthScopes = [
		{
			name: 'read_profile',
			description: 'Read your basic profile information'
		},
		{ name: 'read_data', description: 'Access your stored data' },
		{ name: 'write_data', description: 'Create and modify your data' }
	]

	if (isLoggedIn) {
		const content = await renderLoggedInAuthorizeScreen(oauthScopes, oauthReqInfo)
		return c.html(layout(content, 'MCP Remote Auth Demo - Authorization'))
	}

	const content = await renderLoggedOutAuthorizeScreen(oauthScopes, oauthReqInfo)
	return c.html(layout(content, 'MCP Remote Auth Demo - Authorization'))
})

// The /authorize page has a form that will POST to /approve
// This endpoint is responsible for validating any login information and
// then completing the authorization request with the OAUTH_PROVIDER
auth.post('/approve', async c => {
	const { action, oauthReqInfo, email, password } = await parseApproveFormBody(await c.req.parseBody())

	if (!oauthReqInfo) {
		return c.html('INVALID LOGIN', 401)
	}

	// If the user needs to both login and approve, we should validate the login first
	if (action === 'login_approve') {
	}

	// The user must be successfully logged in and have approved the scopes, so we
	// can complete the authorization request
	const { redirectTo } = await c.env.OAUTH_PROVIDER.completeAuthorization({
		request: oauthReqInfo,
		userId: email,
		metadata: {
			label: 'Test User'
		},
		scope: oauthReqInfo.scope,
		props: {
			userEmail: email
		}
	})

	return c.html(layout(await renderAuthorizationApprovedContent(redirectTo), 'MCP Remote Auth Demo - Authorization Status'))
})

export default auth
