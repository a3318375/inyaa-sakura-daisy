<script setup>
const data = await useFetch('/config/findAll', {
  parseResponse: JSON.parse,
  baseURL: 'https://api.inyaw.com/inyaa-admin',
  method: 'GET',
  params: {
    type: 0,
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
  <div class="w-full bg-white bg-opacity-70">
    <div class="text-center">
      <p><a href="https://beian.miit.gov.cn" target="_blank">{{ data.WEB_ICP }}</a></p>
      <p><a href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral">本网站由 <img src="https://media.inyaw.com/icon/%E5%8F%88%E6%8B%8D%E4%BA%91_logo5.png!inyaa" class="inline h-30px" alt="又拍"> 提供CDN加速/云存储服务</a></p>
    </div>
  </div>
</template>
