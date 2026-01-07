export interface Response<T> {
  code: number;
  data: T | null;
  message: string;
}
