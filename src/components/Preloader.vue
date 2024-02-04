<template>
  <div class="preloader">
    <img :src="preloader" :alt="alt" />
  </div>
</template>

<script>
export default {
  name: "Preloader",
  data() {
    return {
      preloader:
        "https://user-images.githubusercontent.com/74377158/198117217-8caeedc6-080d-47c7-87ae-9efecfd41445.gif",
      alt: "Preloader gif",
    }
  },
  methods: {
    loadPreloader() {
      const preloader = document.querySelector(".preloader")

      window.addEventListener("load", () => {
        preloader.classList.add("hide-preloader")
      })
    },
  },
  mounted() {
    this.loadPreloader()
  },
}
</script>

<style lang="scss">
@import "../assets/scss/styles/preloader.scss";
</style>