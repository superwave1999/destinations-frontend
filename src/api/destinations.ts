import AbstractApi from '@/api/abstractApi'
import type { Destination, DestinationEditable } from '@/api/types/destination'
import type { PaginationState } from '@/api/types/paginationState'
import type { ResponseBody } from '@/api/types/response'

export default class Destinations extends AbstractApi {
  protected modelUrlPath = '/api/destinations'

  async index(
    filters: object
  ): Promise<{ data: Destination[]; pagination: PaginationState } | null> {
    const response = await this.sendRequest(this.modelUrlPath, 'GET', null, filters)
    return response !== null
      ? {
          data: response.body.data as Destination[],
          pagination: response.body.meta as PaginationState
        }
      : null
  }

  async show(id: number | string): Promise<Destination | null> {
    const response = await this.sendRequest(`${this.modelUrlPath}/${id}`, 'GET', null, null)
    return (response?.body?.data as Destination) || null
  }

  async store(data: DestinationEditable): Promise<ResponseBody | null> {
    const response = await this.sendRequest(this.modelUrlPath, 'POST', data, null)
    if (response === null || response.statusCode === 404) {
      return null
    }
    return response.body
  }

  async update(id: number | string, data: DestinationEditable): Promise<ResponseBody | null> {
    const response = await this.sendRequest(`${this.modelUrlPath}/${id}`, 'PUT', data, null)
    if (response === null || response.statusCode === 404) {
      return null
    }
    return response.body
  }

  async destroy(id: number | string): Promise<Destination | null> {
    const response = await this.sendRequest(`${this.modelUrlPath}/${id}`, 'DELETE', null, null)
    return (response?.body?.data as Destination) || null
  }
}
