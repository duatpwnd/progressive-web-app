<template>
  <div>
    {{ title }}
    {{ res }}
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      title: '',
      res: '',
    }
  },
  methods: {},
  mounted() {
    this.$axios.get('/api/jest1').then((result) => {
      this.title = result.data.data.title
    })
  },
  created() {
    this.$axios.get('/api/jest2').then((result) => {
      this.res = result.data.data.title
    })
  },
}
</script>
<style scoped lang="scss"></style>
