import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { NavigationResources } from './navigation'
import { SearchResources } from './search'
import { TranslationsResources } from './translations'

const AllResources = [...NavigationResources, ...SearchResources, ...TranslationsResources]

export function ResourceFactory(server: McpServer) {
	AllResources.map(resource => resource()).forEach(resource =>
		server.resource(
			resource.name,
			resource.uri,
			{ description: resource.description },
			resource.handler
		)
	)
}
