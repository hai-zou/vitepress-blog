<template>
    <div id="vcomments"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from 'vitepress';
import { ValineOptions } from '../../types/interface';

const valineEl = ref(null);
const props = defineProps<{ options: ValineOptions }>();
const { appId, appKey, ...others } = props.options;
const route = useRoute();

function initValine() {
    valineEl.value?.init({
        el: '#vcomments' ,
        appId,
        appKey,
        path: route.path,
        ...others,
    })
}

onMounted(() => {
    import('valine').then(res => {
        const Valine = res.default;
        valineEl.value = new Valine();
        initValine();
    });
});

watch(route, () => {
    initValine();
});
</script>

<style scoped>
#vcomments {
    margin-top: 2rem;
}
</style>