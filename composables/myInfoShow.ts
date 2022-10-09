export function useMyInfoShow() {
  const myInfoShow = useState('myInfoShow', () => false)

  function updateMyInfoShow() {
    myInfoShow.value = true
  }
  function updateMyInfoHide() {
    myInfoShow.value = false
  }

  return {
    myInfoShow,
    updateMyInfoShow,
    updateMyInfoHide,
  }
}
