import { NavigationTools } from '@/tools/navigation'
import { TranslationsTools } from '@/tools/translations'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

export function ToolFactory(server: McpServer) {
	NavigationTools.map(tool => tool()).forEach(tool =>
		server.tool(tool.name, tool.description, tool.schema, tool.handler)
	)
	TranslationsTools.map(tool => tool()).forEach(tool =>
		server.tool(tool.name, tool.description, tool.schema, tool.handler)
	)
}
