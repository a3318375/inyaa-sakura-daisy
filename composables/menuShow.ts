export function useMenuShow() {
  const menuShow = useState('menuShow', () => true)

  function updateMenuShow() {
    menuShow.value = true
  }
  function updateMenuHide() {
    menuShow.value = false
  }

  return {
    menuShow,
    updateMenuShow,
    updateMenuHide,
  }
}
