import windicss from 'vite-plugin-windicss'

export default {
  plugins: [
    windicss({
      searchDirs: ['.vitepress/theme']
    })
  ]
}
