type FetchConfig = {
  method?: string
  data?: unknown
}

type RequestCredentials = 'omit' | 'same-origin' | 'include'

type ParamsType = {
  method: string
  headers: Record<string, string>
  credentials: RequestCredentials
  body?: string
}

const fetchData = async ({ extension, config }: { extension: string; config?: FetchConfig }) => {
  const method = config?.method ?? 'GET'
  const token = localStorage.getItem('token')
  const params: ParamsType = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  }

  if (method !== 'GET' && config?.data) {
    params.body = JSON.stringify(config.data)
  }
  const response = await fetch(`${import.meta.env.VITE_BACKEND}/${extension}`, params)
  const data = await response.json()
  return data
}

export { fetchData }
