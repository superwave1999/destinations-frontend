export interface PaginationState {
  perPage: number
  currentPage: number
  firstPage: number
  isEmpty: boolean
  total: number
  hasTotal: boolean
  lastPage: number
  hasMorePages: boolean
  hasPages: boolean
}
