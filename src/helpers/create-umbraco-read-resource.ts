import { ResourceDefinition } from '@/types/resource-definition.js'

export const CreateUmbracoReadResource =
	(
		uri: string,
		name: string,
		description: string,
		handler: (uri: any, variables: any, id?: string) => Promise<any>
	): (() => ResourceDefinition) =>
	() => ({
		uri,
		name,
		description,
		handler
	})
