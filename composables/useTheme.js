const STORAGE_KEY = 'theme'

export function useTheme() {
  const theme = useState('app-theme', () => 'device')

  const resolveIsDark = (value = theme.value) => {
    if (value === 'dark') return true
    if (value === 'light') return false
    if (import.meta.client) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  }

  const applyTheme = () => {
    if (!import.meta.client) return
    const isDark = resolveIsDark()
    const html = document.documentElement
    html.classList.toggle('dark', isDark)
    html.style.colorScheme = isDark ? 'dark' : 'light'
    html.dataset.theme = theme.value
  }

  const setTheme = (value) => {
    theme.value = value
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, value)
      applyTheme()
    }
  }

  const loadTheme = () => {
    if (!import.meta.client) return
    theme.value = localStorage.getItem(STORAGE_KEY) || 'device'
    applyTheme()
  }

  const watchSystemTheme = () => {
    if (!import.meta.client) return
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', () => {
      if (theme.value === 'device') applyTheme()
    })
  }

  const initTheme = () => {
    loadTheme()
    watchSystemTheme()
  }

  return {
    theme,
    setTheme,
    applyTheme,
    loadTheme,
    initTheme,
    resolveIsDark
  }
}
