<script setup>
const { blogNum } = useBlogNum()
const nuxtApp = useNuxtApp()
const route = useRoute()
const { myInfoShow } = useMyInfoShow()
const blog = ref({
  type: 1,
  url: 'background-image: url(https://media.inyaw.com/cover/7037ade43b1e484eac903a111b7ea709.jpg!inyaa)',
  blog: {
    title: '梦幻小屋',
  },
})
const data = await useFetch('/blog/web/info', {
  parseResponse: JSON.parse,
  baseURL: 'https://api.inyaw.com/inyaa-admin',
  method: 'GET',
  params: {
    id: route.params.id,
  },
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
blog.value.url = data.cover
blog.value.blog = data
useHead({
  title: data ? data.title : '瑶瑶的梦中小屋',
  link: [
    { rel: 'icon', href: 'https://media.inyaw.com/icon/favicon.ico' },
  ],
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
    { name: 'keywords', content: data ? data.title : '瑶瑶的梦中小屋' },
    { name: 'description', content: data ? data.summary : '瑶瑶的梦中小屋，一个个人小站.' },
  ],
})
</script>

<template>
  <div>
    <div id="mainContent" class="lg:grid lg:grid-cols-12 lg:gap-4 px-4 py-8">
      <div class="w-full lg:col-start-2 md:col-end-9 lg:pr-3">
        <div class="card w-full glass rounded-none static group">
          <figure><img :src="data.cover" alt="car!"></figure>
          <div class="card-body w-full absolute bottom-0 bg-neutral bg-opacity-60 text-white p-3 transition duration-500 translate-y-8 group-hover:translate-y-0">
            <h2 class="card-title block w-full">
              <a>{{ data.title }}</a>
            </h2>
            <div class="text-xs">
              <span><div class="i-carbon-time text-sm mr-1 inline-block bg-base-500 w-3 h-3" />{{ nuxtApp.$dayjs(data.createTime).format('YYYY-MM-DD') }}</span>
              <span class="mx-2"><div class="i-carbon-view text-sm mr-1 inline-block bg-base-500 w-3 h-3" />{{ data.views }} 热度</span>
              <span class="mr-2"><div class="i-carbon-pending text-sm mr-1 inline-block bg-base-500 w-3 h-3" />{{ data.comments }} 条评论</span>
              <span><div class="i-carbon-open-panel-top text-sm mr-1 inline-block bg-base-500 w-3 h-3" />{{ data.type.name }}</span>
            </div>
            <p class="truncate ...">{{ data.summary }}</p>
          </div>
        </div>
        <div class="bg-primary-content opacity-80 shadow-md">
          <article class="prose max-w-none p-4" v-html="data.article ? nuxtApp.$markit.render(data.article.context) : '' " />
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
          <div class="px-6 py-5 bg-primary-content opacity-80 shadow-md rounded-xl mt-5">
            <div><div class="i-heroicons-bars-3-center-left-20-solid w-5 h-5 pt-1 inline-block" />目录</div>
            <div class="px-6 py-4" v-html="nuxtApp.$markit.topHtml" />
          </div>
          <div class="sticky px-6 py-5 bg-primary-content opacity-80 shadow-md rounded-xl mt-5">
            <div>最近文章</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

