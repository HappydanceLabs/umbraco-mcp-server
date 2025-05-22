import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { NavigationResources } from './navigation'
import { TranslationsResources } from './translations'

export function ResourceFactory(server: McpServer) {
	NavigationResources.map(resource => resource()).forEach(resource =>
		server.resource(
			resource.name,
			resource.uri,
			{ description: resource.description },
			resource.handler
		)
	)

	TranslationsResources.map(resource => resource()).forEach(resource =>
		server.resource(
			resource.name,
			resource.uri,
			{ description: resource.description },
			resource.handler
		)
	)
}
