<script setup>
const { blogNum } = useBlogNum()
const { myInfoShow } = useMyInfoShow()
const blog = ref({
  type: 2,
  url: 'https://media.inyaw.com/cover/7037ade43b1e484eac903a111b7ea709.jpg',
  blog: {
    title: '关于我',
  },
})
useHead({
  title: '关于我',
  link: [
    { rel: 'icon', href: 'https://media.inyaw.com/icon/favicon.ico' },
  ],
  meta: [
    { name: 'keywords', content: '瑶瑶,梦中小屋,瑶瑶的梦中小屋' },
    { name: 'description', content: '瑶瑶的梦中小屋，一个个人小站.' },
  ],
})

const imgData = await useFetch('/file/image?type=0', {
  parseResponse: JSON.parse,
  baseURL: 'https://api.inyaw.com/inyaa-picture',
  method: 'GET',
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
blog.value.url = imgData
</script>

<template>
  <div>
    <div id="mainContent" class="lg:grid lg:grid-cols-12 lg:gap-4 px-4 py-8">
      <div class="w-full lg:col-start-2 md:col-end-9 lg:pr-3">
        <div class="bg-primary-content opacity-80 shadow-md">
          <article class="prose max-w-none p-4">
            <p>本人为java开发，也算是工作多年</p>
            <p>第一次是用ssm + jsp + bootstrap做的，当时因为服务器很贵，所以很快就放弃了</p>
            <p>后台前端经过多次变化，比如，改用了vue + iview却不会做自适应，之后又改用了nodejs+layui</p>
            <p>前一阵用新号，买了2H8G5M的服务器，一次买了3年。</p>
            <p>前一阵用了wordpress做博客，但是及其不方便</p>
            <p>所以就有了现在的博客，后端采用了spring boot，搭建了一套oauth2，认证服务器、授权服务器和客户端。授权服务器和客户端，也切到了最新的写法。</p>
            <p>当然，目前还没完善,还在后续尝试中。比如服务器配置比较好，尝试了一键k8s，尝试用k8s的配置中心、服务注册、服务发现。</p>
            <p>前端采用了，vue3 + vite2。UI借鉴了大佬的wordpress的Sakura主题，也不断在完善中</p>
          </article>
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
