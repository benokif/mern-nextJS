// 🔵 customize based on API url
const port = process.env.port || 3000

const url = process.env.NODE_ENV === 'production' ? "https://mern-nextjs.onrender.com" : `http://localhost:${port}`
const baseUrl = `${url}/api/v1`;

export type Headers = { [key: string]: string };

interface FetchOptions {
  method?: string;
  headers?: Headers;
  body?: any;
  credentials?: RequestCredentials;
}


interface ApiInstanceOptions {
  baseURL: string;
  headers?: Headers;
  cache?: "force-cache" | "no-store";
}

export function createApiInstance(options: ApiInstanceOptions) {
  return async <T = any>(
    endpoint: string,
    fetchOptions: FetchOptions = {}
  ): Promise<{ data: T; headers: globalThis.Headers }> => {
    const { baseURL, headers: defaultHeaders, cache } = options;
    const { method = "GET", headers = {}, body, credentials  } = fetchOptions;
    
    const response = await fetch(`${baseURL}${endpoint}`, {
      method,
      headers: { ...defaultHeaders, ...headers },
      body,
      credentials,
      cache
    });

    if (response.status > 206) {
      if (
        response.status === 400 ||
        response.status === 401 ||
        response.status === 404 ||
        response.status === 500 ||
        response.status === 503
        ) {
          const errorData = await response.json();
          // 🔵 customize based on API error response
          if (response.status === 400) {
            throw new Error(`Bad Request: ${errorData.msg}`);
          } else if (response.status === 401) {
            throw new Error(`Unauthorized: ${errorData.msg}`);
          } else if (response.status === 404) {
            throw new Error(`Not Found: ${errorData.msg}`);
          } else if (response.status === 500) {
            throw new Error(`Internal Server Error: ${errorData.msg}`);
          } else if (response.status === 503) {
            throw new Error(`Service Unavailable: ${errorData.msg}`);
          } else {
            throw new Error(`HTTP Status ${response.status}: ${errorData.msg}`);
          }
        }
      }
      
      const responseData = await response.json();
  
    return { data: responseData, headers: response.headers };
  };
}

// 🔵 customize based on headers 
export const apiInstanceFetch = createApiInstance({
  baseURL: baseUrl
});

// 🔵 customize based on headers
// 🔧 by default, fetch is not cached if using cookies.
//    we use this to ensure 
export const apiInstanceFetchCache = createApiInstance({
  baseURL: baseUrl,
  cache: 'force-cache'
});

// 🔵 customize based on headers 
export const api2Instance = createApiInstance({
  baseURL: baseUrl,
  headers: { "X-API-Key": "another key" },
});
