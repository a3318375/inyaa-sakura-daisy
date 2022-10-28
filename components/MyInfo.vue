<script setup>
const { blogNum } = useBlogNum()
</script>

<template>
  <div id="myInfo" class="w-full px-6 py-5 bg-base-100 opacity-80 shadow-md rounded-xl">
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
</template>

