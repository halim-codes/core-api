export interface Meta {
  total: number;
  count: number;
}

export interface Links {
  [key: string]: string;
}

export interface ApiResponse<T> {
  data: T;
  meta?: Meta;
  links?: Links;
  statusCode?: number;
  message?: string;
}
