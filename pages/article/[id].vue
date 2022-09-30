<script setup>
const { blogNum } = useBlogNum()
const nuxtApp = useNuxtApp()
const route = useRoute()
const { menuShow } = useMenuShow()
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
    <MainCover :data="blog" />
    <div>
      <BgCanvas />
      <div id="mainContent" class="grid grid-cols-24 px-4 py-8">
        <div class="col-start-3 col-end-18 pr-3">
          <div class="bg-white shadow-md">
            <article class="prose max-w-none p-4" v-html="data.article ? nuxtApp.$markit.render(data.article.context) : '' " />
          </div>
        </div>
        <div class="col-start-18 col-end-23 pl-0.75">
          <div class="w-full px-6 py-5 bg-white shadow-md rounded-xl">
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
          <div class="w-full sticky top-5" :class="[menuShow ? 'transition duration-500 translate-y-16' : 'transition duration-500 -translate-y-0']">
            <div class="px-6 py-5 bg-white shadow-md rounded-xl mt-5">
              <div><div class="i-heroicons-bars-3-center-left-20-solid w-5 h-5 pt-1 inline-block" />目录</div>
              <div class="px-6 py-4" v-html="nuxtApp.$markit.topHtml" />
            </div>
            <div class="sticky px-6 py-5 bg-white shadow-md rounded-xl mt-5">
              <div>最近文章</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

