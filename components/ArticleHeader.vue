<script setup>
const props = defineProps({
  isArticle: Boolean,
  cover: String,
  title: String,
  data: Object,
})
console.log(props)
const nuxtApp = useNuxtApp()
</script>

<template>
  <div class="relative hero h-96" :style="cover">
    <div class="relative hero-overlay bg-opacity-30" />
    <div class="absolute items-center bottom-0 text-center text-neutral-content">
      <div>
        <h6 class="mb-5 text-5xl">
          {{ isArticle ? data.title : title }}
        </h6>
        <div class="mb-5 text-center">
          <div v-if="isArticle" class="flex justify-start">
            <div class="i-heroicons-outline-calendar w-6 h-6" />
            <span class="px-1">发布于 {{ nuxtApp.$dayjs(data.createTime).fromNow() }}</span>
            <span class="px-1">|</span>
            <div class="i-carbon-view w-6 h-6" />
            <span class="px-1">阅读数 {{ data.views }}</span>
            <span class="px-1">|</span>
            <div class="i-heroicons-outline-chat-alt w-6 h-6" />
            <span class="px-1">评论数 {{ data.comments }}</span>
            <span class="px-1">|</span>
            <div class="i-heroicons-outline-folder-open w-6 h-6" />
            <span class="px-1">{{ data.type.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

