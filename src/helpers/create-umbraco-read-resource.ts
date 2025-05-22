import { ResourceDefinition } from '@/types/resource-definition.js'
import { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js'

export const CreateUmbracoReadResource =
	(
		uri: string,
		name: string,
		description: string,
		handler: () => Promise<ReadResourceResult>
	): (() => ResourceDefinition) =>
	() => ({
		uri,
		name,
		description,
		handler
	})
