<template>
    <section>
        <article>
            <div class="pokeball bounce"></div>
        </article>
    </section>
</template>

<script>
    export default {
        name: "Loading"
    }
</script>

<style lang="scss">
    .pokeball {
        width: 50px;
        height: 50px;
        border-radius: 50px;
        border: 2px solid #000;
        position: relative;
        background: linear-gradient(to bottom, #EEEEEE 0%,#FFFFFF 100%);
        margin: 10px auto;
        animation-duration: 1000ms;
        animation-iteration-count: infinite;

        &::before, &::after {
            content: '';
            display: block;
        }

        &::before {
            width: 50px;
            height: 25px;
            border-bottom: 2px solid #000;
            border-radius: 25px 25px 0 0;
            background: linear-gradient(to bottom, #d10000 0%,#ff0000 50%);
        }

        &::after {
            content: '';
            width: 10px;
            height: 10px;
            background: linear-gradient(to bottom, #FFF 0%,#CCC 100%);
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            box-shadow: 0 0 0 (50px/50) black,
            0 0 0 (50px/25) #ddd,
            0 0 0 (50px/14) black,
            0 0 (50px/10) (50px/17) rgba(0,0,0,0.4);
        }

        &.bounce {
            animation-name: bounce;
            animation-timing-function: linear;
        }

        @keyframes bounce {
            0%   { transform: translateY(0); }
            50%  { transform: translateY(-30px); }
            100% { transform: translateY(0); }
        }
    }
</style>