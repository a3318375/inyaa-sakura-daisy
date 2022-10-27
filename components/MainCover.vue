<script setup>
const { show } = useScroll()
function toDwon() {
  document.getElementById('cardTop').scrollTop = 0
}
</script>

<template>
  <div id="myCover" class="hero min-h-screen">
    <div class="hero-content text-center bg-base-100 bg-opacity-60 rounded-full">
      <div class="max-w-md">
        <p class="text-neutral">
          欢迎来到瑶瑶小站
        </p>
      </div>
    </div>
    <div class="absolute bottom-9">
      <button type="button" :class="[show ? '' : 'hidden']" @click="toDwon">
        <div class="i-heroicons-outline-chevron-down w-6 h-6" />
      </button>
    </div>
  </div>
</template>

