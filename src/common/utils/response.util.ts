import { ApiResponse, Meta, Links } from './response.interface';

export function formatSingle<T extends { id: number }>(
  resource: T,
  basePath: string
): T & { _links: Links } {
  return {
    ...resource,
    _links: {
      self: `${basePath}/${resource.id}`,
      edit: `${basePath}/${resource.id}`,
      delete: `${basePath}/${resource.id}`,
    },
  };
}

export function formatList<T extends { id: number }>(
  resources: T[],
  basePath: string
): { data: (T & { _links: Links })[]; meta: Meta; links: Links } {
  const data = resources.map(r => formatSingle(r, basePath));
  const meta: Meta = { total: data.length, count: data.length };
  return { data, meta, links: { self: basePath } };
}

export function wrapResponse<T>(
  data: T,
  meta?: Meta,
  links?: Links,
  message = 'successful',
  statusCode = 200
): ApiResponse<T> {
  return { data, meta, links, message, statusCode };
}
