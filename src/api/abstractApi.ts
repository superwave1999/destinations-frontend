import type { Response as ServerResponse } from '@/api/types/response'

export default abstract class AbstractApi {
  protected baseUrl = import.meta.env.VITE_API_URL

  protected async sendRequest(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    body: object | null,
    urlParams: object | null
  ): Promise<ServerResponse | null> {
    const headers: Headers = new Headers({ Accept: 'application/json' })
    const config: RequestInit = {
      method,
      mode: 'cors',
      cache: 'no-cache'
    }
    if (body) {
      config.body = JSON.stringify(body)
      headers.append('Content-Type', 'application/json')
    }
    config.headers = headers
    const urlBuilder = new URL(`${this.baseUrl}${url}`)
    if (urlParams) {
      const searchParams: Record<string, any> = new URLSearchParams()
      for (const key in urlParams) {
        searchParams.append(key, urlParams[key as keyof typeof urlParams])
      }
      urlBuilder.search = searchParams.toString()
    }
    try {
      const response: Response = await fetch(urlBuilder, config)
      return {
        body: await response.json(),
        ok: response.ok,
        statusCode: response.status
      }
    } catch (e) {
      alert('Network error')
      console.error(e)
      return null
    }
  }
}
