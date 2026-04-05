export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('token')

  const publicRoutes = ['/login']

  if (to.path.startsWith('/admin') && !publicRoutes.includes(to.path)) {
    if (!token.value) {
      return navigateTo('/login')
    }
  }

  if (publicRoutes.includes(to.path) && token.value) {
    return navigateTo('/admin')
  }
})