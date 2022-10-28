<script setup>
const nuxtApp = useNuxtApp()
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

const toNext = async () => {
  if (pageNum >= maxPage)
    return
  else
    pageNum++

  params.page = pageNum
  const data = await useFetch('/blog/web/page', {
    parseResponse: JSON.parse,
    baseURL: 'https://api.inyaw.com/inyaa-admin',
    method: 'GET',
    params,
    key: 'page-' + params.page,
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
  //blogList.value = data.content
  blogList.value = [...blogList.value, ...data.content]
  maxPage = data.totalPages
  totalElements.value = data.totalElements
  totalPages.value = data.totalPages
  if (pageNum > 1)
    location.href = '#cardTop'
}
toNext()
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
                <div class="card-body w-full absolute bottom-0 bg-base-content bg-opacity-60 text-base-100 p-3 transition duration-500 translate-y-8 group-hover:translate-y-0">
                  <h2 class="card-title block w-full">
                    <a :href="`/article/${item.id}`">{{ item.title }}</a>
                  </h2>
                  <div class="text-xs">
                    <div class="i-carbon-time text-sm mr-1 inline-block bg-base-500 w-3 h-3" />{{ nuxtApp.$dayjs(item.createTime).format('YYYY-MM-DD') }}
                    <div class="i-carbon-view text-sm mx-2 mr-1 inline-block bg-base-500 w-3 h-3" />{{ item.views }} 热度
                    <div class="i-carbon-pending text-sm mx-2 mr-1 inline-block bg-base-500 w-3 h-3" />{{ item.comments }} 条评论
                    <div class="i-carbon-open-panel-top text-sm mr-1 inline-block bg-base-500 w-3 h-3" />{{ item.type.name }}
                  </div>
                  <p class="truncate ...">{{ item.summary }}</p>
                </div>
              </div>
            </a>
          </div>
          <div class="flex justify-center">
            <button class="btn btn-outline text-base-100" @click="toNext">下一页</button>
          </div>
        </div>
        <div class="hidden lg:block lg:col-start-9 lg:col-end-12 lg:pl-0.75">
          <MyInfo />
          <div class="w-full" :class="[myInfoShow ? 'sticky top-5' : '']">
            <HotArticle />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
