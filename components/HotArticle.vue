<script setup>
const nuxtApp = useNuxtApp()
const hotArticleList = useState('hotArticleList', () => [])
const data = await useFetch('/blog/web/list', {
  parseResponse: JSON.parse,
  baseURL: 'https://api.inyaw.com/inyaa-admin',
  method: 'GET',
  params: {
    isHot: true,
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
</script>

<template>
  <div class="sticky px-6 py-5 bg-primary-content opacity-80 shadow-md rounded-xl mt-5">
    <div>最近文章</div>
    <div v-for="(item, index) in data" :key="index" class="flex pt-2">
      <a :href="`/article/${item.id}`">
        <img :src="item.cover" class="w-16 h-full" />
      </a>
      <div class="flex-1 pl-2">
        <a :href="`/article/${item.id}`">{{ item.title }}</a>
        <div>{{ nuxtApp.$dayjs(item.createTime).format('YYYY-MM-DD') }}</div>
      </div>
    </div>
  </div>
</template>

