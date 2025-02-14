export interface MessageResponse<T> {
  status_code: number;
  message: string;
  data: T;
}
