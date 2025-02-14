export interface PaginationResponse<T> {
  results: T[];
  offset: number;
  limit: number;
  total_items: number;
}
