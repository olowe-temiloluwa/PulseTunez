export default defineNuxtRouteMiddleware((to) => {
  // Auth state is persisted in localStorage, so only enforce on the client
  // to avoid false redirects during server-side rendering.
  if (import.meta.server) return

  const authStore = useAuthStore()
  authStore.initializeAuth()

  if (!authStore.isAuthenticated) {
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
