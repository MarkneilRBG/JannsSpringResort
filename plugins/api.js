export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiBase,

    // Optional: add headers (future auth ready)
    onRequest({ options }) {
      const token = process.client ? localStorage.getItem('token') : null;

      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        console.error("Unauthorized");
      }
    }
  });

  return {
    provide: {
      api,
    },
  };
});