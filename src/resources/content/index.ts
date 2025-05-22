import { GetContentResource } from './getContent'
import { GetContentItemByIdResource } from './getContentItemById'
import { GetContentItemByPathResource } from './getContentItemByPath'

export { GetContentItemByIdResource, GetContentItemByPathResource, GetContentResource }

export const ContentResources = [
	GetContentResource,
	GetContentItemByIdResource,
	GetContentItemByPathResource
]
