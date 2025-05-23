import { ResourceTemplateDefinition } from '@/types/resource-template-definition.js'
import {
	ReadResourceTemplateCallback,
	ResourceTemplate
} from '@modelcontextprotocol/sdk/server/mcp.js'

export const CreateUmbracoTemplateResource =
	(
		name: string,
		description: string,
		template: ResourceTemplate,
		handler: ReadResourceTemplateCallback
	): (() => ResourceTemplateDefinition) =>
	() => ({
		name,
		description,
		template,
		handler
	})
