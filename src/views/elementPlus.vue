<script setup lang="ts">

import Categorys from '@/components/elementPlus/Categorys.vue';
import Press from '@/components/elementPlus/Press.vue';
import Bar from '@/components/elementPlus/Bar.vue';

</script>
<template>
    <Bar></Bar>
    <Categorys style="z-index: 50; position:fixed; top: 50%; right: 1rem; transform: translateY(-50%)"></Categorys>
    <Press></Press>

</template>