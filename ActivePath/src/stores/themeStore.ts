import { ref, computed } from 'vue'

export const useThemeStore = () => {
  // 主题状态
  const isDarkMode = ref(false)

  // 从localStorage加载主题设置
  const loadThemeFromStorage = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      isDarkMode.value = savedTheme === 'dark'
    } else {
      // 检查系统主题偏好
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }

  // 切换主题
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
    applyTheme()
  }

  // 应用主题到document
  const applyTheme = () => {
    const html = document.documentElement
    if (isDarkMode.value) {
      html.classList.add('dark')
      html.classList.remove('light')
    } else {
      html.classList.add('light')
      html.classList.remove('dark')
    }
  }

  // 主题图标
  const themeIcon = computed(() => {
    return isDarkMode.value ? '🌙' : '☀️'
  })

  // 主题文本
  const themeText = computed(() => {
    return isDarkMode.value ? 'Dark Mode' : 'Light Mode'
  })

  return {
    isDarkMode,
    themeIcon,
    themeText,
    toggleTheme,
    loadThemeFromStorage
  }
}
