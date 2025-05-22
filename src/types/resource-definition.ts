import { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js'

export interface ResourceDefinition {
	name: string
	description: string
	uri: string
	handler: (uri: URL, variables?: any, routeId?: string) => Promise<ReadResourceResult>
}
