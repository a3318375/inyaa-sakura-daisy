<script setup>
const nuxtApp = useNuxtApp()
const route = useRoute()
const { myInfoShow } = useMyInfoShow()
const user = useCookie('TOKEN_USER')
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
          <figure><img :src="`${data.cover}!inyaa`" alt="car!"></figure>
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
        <div class="bg-base-100 opacity-80 shadow-md">
          <article class="prose max-w-none p-4" v-html="data.article ? nuxtApp.$markit.render(data.article.context) : '' " />
        </div>
        <div class="pt-5">
          <div class="card w-full rounded-none bg-base-100 opacity-80 shadow-xl lg:grid lg:grid-cols-12 px-5 py-4">
            <div class="col-span-2">
              <img src="https://media.inyaw.com/icon/avatar.png!inyaa" class="w-12 rounded-full">
            </div>
            <div class="col-span-10">
              <div class="flex flex-col">
                <div class="font-bold">调试评论人</div>
                <div class="text-sm opacity-70">2021-10-06 16:37</div>
                <div class="text-sm">目前无法评论，只是在调试样式</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="user" class="pt-5">
          <div class="card w-full rounded-none bg-base-100 opacity-80 shadow-xl">
            <div class="card-body">
              <textarea class="textarea textarea-bordered" placeholder="还在测试中"></textarea>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">发布</button>
              </div>
            </div>
          </div>
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
</template>

