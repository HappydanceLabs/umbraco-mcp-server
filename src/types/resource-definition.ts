import { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js'

export interface ResourceDefinition {
	name: string
	description: string
	uri: string
	handler: () => Promise<ReadResourceResult>
}
