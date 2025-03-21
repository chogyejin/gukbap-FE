type Url = string;
type Headers = { [key: string]: string };
type Config = { headers: Headers; params: URLSearchParams };
type CreateClientOptions = { baseURL: string; headers: Headers };

export interface HttpClient {
  get<D = unknown>(
    url: Url,
    config?: Partial<Config>
  ): Promise<{ data: D; ok: boolean }>;
  post<D = unknown, B = unknown>(
    url: Url,
    body?: B,
    config?: Partial<Config>
  ): Promise<{ data: D; ok: boolean }>;
}

const paramsToString = (params?: URLSearchParams) =>
  params ? `?${params}` : '';

export const createHttpClient = (
  options: Partial<CreateClientOptions> = {}
): HttpClient => {
  const baseURL = options.baseURL ?? '';
  const headers = options.headers ?? {};

  return {
    async get<D = unknown>(url: Url, config?: Partial<Config>) {
      const fetchUrl = `${baseURL}${url}${paramsToString(config?.params)}`;
      const fetchHeaders = { ...headers, ...config?.headers };
      const response = await fetch(fetchUrl, {
        headers: fetchHeaders,
        method: 'GET',
      });
      const responseBody = await response.json().catch(() => null);

      if (response.ok) {
        return { data: responseBody as D, ok: true };
      } else {
        throw responseBody;
      }
    },

    async post<D = unknown, B = unknown>(
      url: Url,
      body?: B,
      config?: Partial<Config>
    ) {
      const fetchUrl = `${baseURL}${url}${paramsToString(config?.params)}`;
      const fetchHeaders = {
        'content-type': 'application/json;charset=UTF-8',
        ...headers,
        ...config?.headers,
      };
      const response = await fetch(fetchUrl, {
        headers: fetchHeaders,
        method: 'POST',
        body: JSON.stringify(body),
      });
      const responseBody = await response.json().catch(() => null);

      if (response.ok) {
        return { data: responseBody as D, ok: true };
      } else {
        throw responseBody;
      }
    },
  };
};
