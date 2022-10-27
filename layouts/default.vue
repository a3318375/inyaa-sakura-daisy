<script setup>
const { show, updateShow, updateHide } = useScroll()
const { menuShow, updateMenuShow, updateMenuHide } = useMenuShow()
const { myInfoShow, updateMyInfoShow, updateMyInfoHide } = useMyInfoShow()
const route = useRoute()
const nowScroll = ref(0)

function handleScroll() {
  const scrollTop = document.getElementById('pageContent').scrollTop
  const myInfo = document.getElementById('myInfo')
  if (nowScroll.value > scrollTop)
    updateMenuShow()

  else
    updateMenuHide()

  if (scrollTop > myInfo.offsetTop + myInfo.offsetHeight)
    updateMyInfoShow()
  else
    updateMyInfoHide()

  nowScroll.value = scrollTop
  const myTop = document.getElementById('pageContent').scrollHeight
  if (scrollTop > myTop / 10) {
    updateHide()
    document.getElementsByClassName('aplayer-title')[0].style.color = '#666'
    document.getElementsByClassName('aplayer-author')[0].style.color = '#666'
    document.getElementsByClassName('aplayer-time-narrow')[0].style.color = '#666'
    document.getElementsByClassName('aplayer-icon-volume-down')[0].firstChild.firstChild.style.fill = '#666'
  }
  else {
    updateShow()
    document.getElementsByClassName('aplayer-title')[0].style.color = '#fff'
    document.getElementsByClassName('aplayer-author')[0].style.color = '#fff'
    document.getElementsByClassName('aplayer-time-narrow')[0].style.color = '#fff'
    document.getElementsByClassName('aplayer-icon-volume-down')[0].firstChild.firstChild.style.fill = '#fff'
  }
}
onMounted(async () => {
  initAudio()
})
function initAudio() {
  // 创建一个音乐播放器实例，并挂载到DOM上，同时进行相关配置
  const ap = new APlayer({
    container: document.getElementById('aplayer'),
    listFolded: true,
    audio: [ // 歌曲列表
      {
        name: '星茶会',
        artist: '灰澈-星茶会',
        url: 'https://media.inyaw.com/icon/test_music.mp3',
        cover: 'http://imge.kugou.com/stdmusic/150/20200812/20200812134914113741.jpg',
        lrc: '',
        theme: '#baf',
      },
    ],
  })
}
const user = useCookie('TOKEN_USER')
const token = useCookie('TOKEN_KEY')
const userNav = useState('userNav', () => [])
userNav.value = [
  {
    name: '登录',
    path: '/login',
  },
]
if (user.value && token.value) {
  userNav.value = []
  userNav.value = [
    {
      name: '消息',
      path: '/message',
    },
    {
      name: '设置',
      path: '/setting',
    },
    {
      name: '登出',
      path: '/logout',
    },
  ]
}
if (!user.value && token.value) {
  const userData = await useFetch('/user/info', {
    parseResponse: JSON.parse,
    baseURL: 'https://api.inyaw.com/inyaa-admin',
    method: 'GET',
    headers: {
      Authorization: token.value,
    },
  }).then((r) => {
    if (!r)
      return {}

    if (!r.data || !r.data.value)
      return {}

    return r.data.value
  })
  if (userData && userData.code === 200) {
    user.value = userData.data
    userNav.value = []
    userNav.value = [
      {
        name: '消息',
        path: '/message',
      },
      {
        name: '设置',
        path: '/setting',
      },
      {
        name: '登出',
        path: '/logout',
      },
    ]
  }
}
function toLogin() {
  window.location.href = 'https://api.inyaw.com/inyaa-admin/toLogin'
}

function toLogout() {
  token.value = null
  user.value = null
  window.location.reload()
}
const menuData = await useFetch('/menu/findMenuList', {
  parseResponse: JSON.parse,
  baseURL: 'https://api.inyaw.com/inyaa-admin',
  method: 'GET',
  params: {
    enable: true,
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
useHead({
  link: [
    { rel: 'icon', href: 'https://media.inyaw.com/icon/favicon.ico' },
  ],
})
</script>

<template>
  <div class="w-full h-screen grid overflow-hidden">
    <div id="pageContent" class="overflow-y-auto" @scroll="handleScroll">
      <img :class="[show ? 'fixed w-full h-full object-cover -z-999 bg-[url(https://media.inyaw.com/cover/14db2cf6e4b441368243b23722d212c9.png)] md:bg-[url(https://media.inyaw.com/cover/7037ade43b1e484eac903a111b7ea709.jpg)] bg-no-repeat bg-cover' : 'fixed filter blur-sm w-full h-full object-cover -z-999 bg-[url(https://media.inyaw.com/cover/14db2cf6e4b441368243b23722d212c9.png)] md:bg-[url(https://media.inyaw.com/cover/7037ade43b1e484eac903a111b7ea709.jpg)] bg-no-repeat bg-cover']">
      <div class="hidden md:navbar bg-opacity-60 sticky top-0 z-999 bg-base-100 bg-opacity-70 transition duration-500" :class="[menuShow ? 'translate-y-0' : '-translate-y-16']">
        <div class="flex-1">
          <a class="btn btn-ghost normal-case text-xl group">
            <ruby>
              <span>yoyo</span>
              <span>の</span>
              <span>梦中小屋</span>
              <rt class="text-10px opacity-0 group-hover:opacity-100">瑶瑶的梦中小屋</rt>
            </ruby>
          </a>
        </div>
        <div class="flex-none hidden lg:block">
          <div id="aplayer" class="hidden lg:block" />
        </div>
        <div class="flex-none hidden lg:block">
          <ul class="menu menu-horizontal">
            <li v-for="(item, index) in menuData" :key="index">
              <a :href="item.path">{{ item.name }}</a>
            </li>
          </ul>
        </div>
        <div class="flex-none hidden lg:block">
          <ThemeChange />
        </div>
        <div class="flex-none gap-2">
          <button class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="i-carbon-user-avatar w-6 h-6" />
            </label>
            <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 text-accent-content">
              <li v-for="(navItem, index) in userNav" :key="index">
                <a v-if="navItem.path === '/login'" @click="toLogin">{{ navItem.name }}</a>
                <a v-else-if="navItem.path === '/logout'" @click="toLogout">{{ navItem.name }}</a>
                <a v-else :href="navItem.path">{{ navItem.name }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <main>
        <slot />
        <Footer />
      </main>
      <div class="md:hidden btm-nav bg-base-100 bg-opacity-70">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        </button>
        <button class="active">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </button>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        </button>
      </div>
    </div>
  </div>
</template>
