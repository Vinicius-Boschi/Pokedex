<template>
    <div class="preloader">
        <img :src="preloader" :alt="alt">
    </div>
</template>

<script>
    export default {
        name: 'Preloader',
        data() {
            return {
                preloader: 'https://user-images.githubusercontent.com/74377158/198117217-8caeedc6-080d-47c7-87ae-9efecfd41445.gif',
                alt: 'Preloader gif'
            }
        },
        methods: {
            loadPreloader() {
                const preloader = document.querySelector('.preloader')

                window.addEventListener('load', () => {
                    preloader.classList.add('hide-preloader')
                })
            }
        },
        mounted() {
            this.loadPreloader()
        }
    }
</script>

<style lang="scss">

    .preloader {
        display: grid;
        justify-content: center;
        align-items: center;
        visibility: visible;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to right, rgb(197, 230, 236), rgb(239, 187, 230));
        z-index: 999;
        transition: all 2s;
    }

    .hide-preloader {
        z-index: 999;
        visibility: hidden;
    }

</style>