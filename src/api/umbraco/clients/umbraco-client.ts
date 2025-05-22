import { Bindings } from '@/app'
// import qs from 'qs'

let currentEnv: Bindings | null = null

// Call this once at startup in your Worker
export function bindUmbracoEnv(env: Bindings) {
	currentEnv = env
}

// --- Fetch wrapper with automatic token and error handling ---
export interface UmbracoClientOptions extends Omit<RequestInit, 'headers'> {
	params?: Record<string, string | number | boolean | string[] | number[]>
	headers?: Record<string, string>
	signal?: AbortSignal
}

export async function UmbracoClient<T>(
	path: string,
	options: UmbracoClientOptions = {}
): Promise<T> {
	const { params, headers = {}, ...rest } = options

	const apiKey: string = currentEnv?.UMBRACO_API_KEY || ''
	const baseURL: string = currentEnv?.UMBRACO_BASE_URL || ''
	const wafKey: string = currentEnv?.WAF_API_KEY || ''

	if (!baseURL) throw new Error('Missing required environment variable: UMBRACO_BASE_URL')
	if (!apiKey) throw new Error('Missing required environment variable: UMBRACO_API_KEY')
	if (!wafKey) throw new Error('Missing required environment variable: WAF_API_KEY')

	// Param serialisation
	// const query = params ? `?${qs.stringify(params, { arrayFormat: 'repeat' })}` : ''
	const query = params ? '?' + new URLSearchParams(params as any).toString() : ''
	const url = `${baseURL}${path}${query}`

	const allHeaders: Record<string, string> = { ...headers }

	allHeaders['Api-Key'] = apiKey
	allHeaders['Happydance'] = wafKey

	const res = await fetch(url, {
		headers: allHeaders,
		...rest
	})

	if (!res.ok) {
		let errMsg = `${res.status} ${res.statusText}`
		try {
			const body = await res.text()
			errMsg += ` - ${body}`
		} catch {
			/* ignore */
		}
		throw new Error(`Umbraco API error: ${errMsg}`)
	}

	const contentType = res.headers.get('content-type') || ''
	if (contentType.includes('application/json')) {
		return res.json() as Promise<T>
	}

	return res.text() as unknown as T
}
