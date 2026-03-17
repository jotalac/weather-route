import { toast } from 'vue3-toastify';

export async function apiClient<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Accept': 'application/json',
      ...options.headers,
    }
  })

  console.log(response)
  if (!response.ok) {
    if (response.status === 429) {
      showRateLimitError()
    }
    throw new Error(`HTTP error: ${response.status}`)
  }

  return response.json()
}

const showRateLimitError = () => {
  toast.error("API limit reached, wait some time.")
}
