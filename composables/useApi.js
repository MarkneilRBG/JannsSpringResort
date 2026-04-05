export const useApi = () => {
  const config = useRuntimeConfig()
  const token = useCookie('token')

  const apiFetch = async (url, options = {}) => {
    try {
      return await $fetch(`${config.public.apiBase}${url}`, {
        ...options,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
          ...(options.headers || {})
        }
      })
    } catch (err) {
      // 🔥 Auto logout if unauthorized
      if (err?.status === 401) {
        token.value = null
        useCookie('user').value = null

        return navigateTo('/admin/login')
      }

      throw err
    }
  }

  return {
    apiFetch
  }
}