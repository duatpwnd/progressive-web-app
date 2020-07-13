<template>
  <div class="container">
    <button @click="push_meessage_send()">PUSH</button>
    <div class="example-3d">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide
          v-for="(colors, index) in swiperOption.backgroundColor"
          :key="index"
          :style="{ background: colors }"
          >{{ colors }}</swiper-slide
        >
      </swiper>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ app, query }) {
    console.log('database 연결3333')
    const dbconnection = await app.$axios.$get(`/api/db_connect`)
  },
  data() {
    return {
      swiperOption: {
        backgroundColor: [
          'red',
          'blue',
          'yellow',
          'black',
          'gray',
          'green',
          'purple',
        ],
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        pagination: {
          el: '.swiper-pagination',
        },
      },
    }
  },
  mounted() {
    const filter = 'win16|win32|win64|mac|macintel'

    class ComicBookCharacter {
      mobile_token: string
      pc_token: string
      constructor(mobile_token: any, pc_token: any) {
        this.mobile_token = mobile_token
        this.pc_token = pc_token
      }
    }
    let data
    if (this.isMobile()) {
      data = new ComicBookCharacter('a', null)
      // data.mobile_token = this.$messageToken
    } else {
      data = new ComicBookCharacter(null, 'b')
    }
    console.log(data)
    this.$axios.post('/api', data).then((result) => {
      console.log(result)
    })
  },
  methods: {
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    },
    push_meessage_send() {
      let device: any
      if (this.isMobile()) {
        device = 'mobile'
      } else {
        device = 'pc'
      }
      this.$axios
        .get(`/api/getToken/?device=${device}`)
        .then((result) => {
          console.log(result)
          if (device === 'pc') {
            console.log('pc임')
            return result.data.mobile_token
          } else {
            return result.data.pc_token
          }
        })
        .then((result) => {
          this.$axios
            .post(
              'https://fcm.googleapis.com/fcm/send',
              {
                to: result,
                notification: {
                  title: '알림테스트 타이틀1111',
                  body: '알림테스트 내용11111',
                  sound: 'default',
                  image: 'https://7cc12d930d4e.ngrok.io/image-analysis.png',
                  icon: 'https://7cc12d930d4e.ngrok.io/icon_512.5f6a36.png',
                },
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization:
                    'key=AAAAFEEaDEc:APA91bGQ0QPvjRNrcJuAuKf4GH7teFuRUm9lcB1QU9TAdxLocjZiJT7WZ_lgf0O0oHS3RHzAk1AXy-xVDMUpBvUlJy_cTn4ba8ni3pnJRC0dE-3yHcJ35fyXWyi-kmVAs-owKwrR0pUN',
                },
              }
            )
            .then((result) => {
              console.log(result)
            })
        })
    },
  },
})
</script>

<style lang="scss">
.container {
  max-width: 768px;
  margin: 0 auto;
  text-align: center;
  height: 400px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  right: 0;
}
.example-3d {
  width: 100%;
  height: 400px;
  padding-top: 50px;
  padding-bottom: 50px;
}
.swiper {
  height: 100%;
  width: 100%;
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 300px;
    text-align: center;
    font-weight: bold;
    color: white;
    font-size: 18px;
    background-position: center;
    background-size: cover;
    // color: $white;
  }
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
</style>
