<script setup>
import { ref, defineProps } from 'vue';

let initTime
let time
let changeTime = ref(0)
let timeRate = ref(0)

const props = defineProps({
    maxTime: {
        type: Number,
        default: 2
    }
})

function reset () {
    initTime = performance.now()
    update()

}

function setRate() {
    timeRate.value = changeTime.value / props.maxTime
}

function update() {
    time = performance.now();
    changeTime.value = (time - initTime) / 1000;
    if (changeTime.value > props.maxTime) {
        reset ();
    } else {
        requestAnimationFrame(update);
    }
    setRate()
}

reset ()
</script>
<style>
</style>

<template>
    <main>
        <div><h1>World</h1></div>
        <progress :value="timeRate"></progress>
        <button @click="reset">Reset</button>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <rect rx="10" ry="10" width="100" height="100" fill="green"/>
            <path d="M 50 50 c 30 30 100 30 130 0 z" fill="none" stroke="black" stroke-width="4"/>
        </svg>
    </main>
</template>