export function useBlogNum() {
  const blogNum = useState('blogNum', () => ref({
    articleNum: 0,
    tagNum: 0,
    typeNum: 0,
  }))

  function setBlogNum(articleNum: number, tagNum: number, typeNum: number) {
    blogNum.value.articleNum = articleNum
    blogNum.value.tagNum = tagNum
    blogNum.value.typeNum = typeNum
  }

  return {
    blogNum,
    setBlogNum,
  }
}
