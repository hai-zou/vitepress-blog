<template>
    <Waline :serverURL="serverURL" :path="path" />
</template>
<script setup lang='ts'>
import { Waline } from '@waline/client/component';
import { computed } from 'vue';
import { useRoute } from 'vitepress';
import { WalineOptions } from '../../types/interface';

import '@waline/client/dist/waline.css';

const props = defineProps<{ options: WalineOptions }>();
const { serverURL } = props.options;
const path = computed(() => useRoute().path);
</script>
