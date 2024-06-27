import type { PaginationState } from '@/api/types/paginationState'
import type { ValidationError } from '@/api/types/validationError'

export interface ResponseBody {
  data: object | object[]
  meta: PaginationState | undefined
  errors: ValidationError[] | undefined
}

export interface Response {
  body: ResponseBody
  ok: boolean
  statusCode: number
}
