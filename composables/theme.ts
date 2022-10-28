export function useTheme() {
  const theme = useState('theme', () => '')

  function setTheme(val: string) {
    theme.value = val
  }

  return {
    theme,
    setTheme
  }
}
