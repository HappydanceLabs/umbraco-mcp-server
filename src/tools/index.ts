import { NavigationTools } from '@/tools/navigation'
import { SearchTools } from '@/tools/search'
import { TranslationsTools } from '@/tools/translations'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { ContentTools } from './content'

export function ToolFactory(server: McpServer) {
	NavigationTools.map(tool => tool()).forEach(tool =>
		server.tool(tool.name, tool.description, tool.schema, tool.handler)
	)
	TranslationsTools.map(tool => tool()).forEach(tool =>
		server.tool(tool.name, tool.description, tool.schema, tool.handler)
	)
	SearchTools.map(tool => tool()).forEach(tool =>
		server.tool(tool.name, tool.description, tool.schema, tool.handler)
	)
	ContentTools.map(tool => tool()).forEach(tool =>
		server.tool(tool.name, tool.description, tool.schema, tool.handler)
	)
}
