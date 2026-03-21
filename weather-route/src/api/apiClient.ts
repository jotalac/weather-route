
export async function apiClient<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Accept': 'application/json',
      ...options.headers,
    }
  })

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`)
  }

  return response.json()
}

