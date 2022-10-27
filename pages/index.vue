<script setup>
const nuxtApp = useNuxtApp()
const { blogNum } = useBlogNum()
const { myInfoShow } = useMyInfoShow()
const route = useRoute()
let pageNum = 0
let maxPage = 1
const totalPages = ref(0)
const totalElements = ref(0)
const blogList = useState('blogList', () => [])

const blog = ref({
  type: 0,
  url: 'https://media.inyaw.com/cover/7037ade43b1e484eac903a111b7ea709.jpg',
  blog: {
    title: '梦幻小屋',
  },
})

const params = {
  size: 10,
}

if (pageNum > 1)
  params.page = pageNum

if (route.params.title)
  params.title = route.params.title

const toNext = async (type) => {
  if (type === 0) {
    if (pageNum < 2)
      return
    else
      pageNum--
  }
  else {
    if (pageNum >= maxPage)
      return
    else
      pageNum++
  }
  params.page = pageNum
  const data = await useFetch('/blog/web/page', {
    parseResponse: JSON.parse,
    baseURL: 'https://api.inyaw.com/inyaa-admin',
    method: 'GET',
    params,
  }).then((r) => {
    if (!r)
      return {}

    if (!r.data || !r.data.value)
      return {}

    if (r.data.value.code && r.data.value.code === 200)
      return r.data.value.data
    else
      return {}
  })
  blogList.value = data.content
  maxPage = data.totalPages
  totalElements.value = data.totalElements
  totalPages.value = data.totalPages
  if (pageNum > 1)
    location.href = '#cardTop'
}
toNext(1)
useHead({
  title: '瑶瑶的梦中小屋',
  link: [
    { rel: 'icon', href: 'https://media.inyaw.com/icon/favicon.ico' },
  ],
  meta: [
    { name: 'keywords', content: '瑶瑶,梦中小屋,瑶瑶的梦中小屋' },
    { name: 'description', content: '瑶瑶的梦中小屋，一个个人小站.' },
  ],
})
</script>

<template>
  <div>
    <MainCover />
    <div>
      <div id="mainContent" class="lg:grid lg:grid-cols-12 lg:gap-4 px-4 py-8">
        <div class="w-full lg:col-start-2 md:col-end-9 lg:pr-3">
          <div v-for="(item, index) in blogList" :key="index" class="grid card rounded-box">
            <a :href="`/article/${item.id}`">
              <div class="card w-full h-4/5 glass static group">
                <figure><img :src="`${item.cover}!inyaa`" class="transform transition duration-700 group-hover:scale-110" alt="car!"></figure>
                <div class="card-body w-full absolute bottom-0 bg-neutral bg-opacity-60 text-base-100 p-3 transition duration-500 translate-y-8 group-hover:translate-y-0">
                  <h2 class="card-title block w-full">
                    <a :href="`/article/${item.id}`">{{ item.title }}</a>
                  </h2>
                  <div class="text-xs">
                    <span><div class="i-carbon-time text-sm mr-1 inline-block bg-base-500 w-3 h-3" />{{ nuxtApp.$dayjs(item.createTime).format('YYYY-MM-DD') }}</span>
                    <span class="mx-2"><div class="i-carbon-view text-sm mr-1 inline-block bg-base-500 w-3 h-3" />{{ item.views }} 热度</span>
                    <span class="mr-2"><div class="i-carbon-pending text-sm mr-1 inline-block bg-base-500 w-3 h-3" />{{ item.comments }} 条评论</span>
                    <span><div class="i-carbon-open-panel-top text-sm mr-1 inline-block bg-base-500 w-3 h-3" />{{ item.type.name }}</span>
                  </div>
                  <p class="truncate ...">{{ item.summary }}</p>
                </div>
              </div>
            </a>
          </div>
          <div class="flex items-center justify-between border-t border-gray-200 bg-base-100 px-4 py-3 sm:px-6">
            <div class="flex flex-1 justify-between sm:hidden">
              <a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-base-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
              <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-base-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
            </div>
            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Showing
                  {{ ' ' }}
                  <span class="font-medium">1</span>
                  {{ ' ' }}
                  to
                  {{ ' ' }}
                  <span class="font-medium">10</span>
                  {{ ' ' }}
                  of
                  {{ ' ' }}
                  <span class="font-medium">{{ totalElements }}</span>
                  {{ ' ' }}
                  results
                </p>
              </div>
              <div>
                <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <a href="#" class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-base-100 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                    <span class="sr-only">Previous</span>
                    <div class="i-heroicons-chevron-left-solid h-5 w-5" aria-hidden="true" />
                  </a>
                  <template v-for="item in maxPage" :key="item">
                  </template>
                  <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-base-100 border-gray-300 text-gray-500 hover:bg-gray-50" -->
                  <a href="#" aria-current="page" class="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20">1</a>
                  <a href="#" class="relative inline-flex items-center border border-gray-300 bg-base-100 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">2</a>
                  <a href="#" class="relative hidden items-center border border-gray-300 bg-base-100 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex">3</a>
                  <span class="relative inline-flex items-center border border-gray-300 bg-base-100 px-4 py-2 text-sm font-medium text-gray-700">...</span>
                  <a href="#" class="relative hidden items-center border border-gray-300 bg-base-100 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex">8</a>
                  <a href="#" class="relative inline-flex items-center border border-gray-300 bg-base-100 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">9</a>
                  <a href="#" class="relative inline-flex items-center border border-gray-300 bg-base-100 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">10</a>
                  <a href="#" class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-base-100 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                    <span class="sr-only">Next</span>
                    <div class="i-heroicons-chevron-right-solid h-5 w-5" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div class="hidden lg:block lg:col-start-9 lg:col-end-12 lg:pl-0.75">
          <div id="myInfo" class="w-full px-6 py-5 bg-primary-content opacity-80 shadow-md rounded-xl">
            <div class="flex justify-center">
              <img src="https://media.inyaw.com/icon/avatar.png!inyaa" class="rounded-full w-32">
            </div>
            <div class="flex justify-center text-2xl">
              四埜宫瑶
            </div>
            <div class="flex justify-center">
              一个无名小卒罢了
            </div>
            <div class="flex justify-center text-center">
              <div class="w-1/3">
                <div>文章</div>
                <div>{{ blogNum.articleNum }}</div>
              </div>
              <div class="w-1/3">
                <div>标签</div>
                <div>{{ blogNum.tagNum }}</div>
              </div>
              <div class="w-1/3">
                <div>分类</div>
                <div>{{ blogNum.typeNum }}</div>
              </div>
            </div>
          </div>
          <div class="w-full" :class="[myInfoShow ? 'sticky top-5' : '']">
           <HotArticle />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
