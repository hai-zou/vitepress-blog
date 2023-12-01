<template>
    <div id="docsearch"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useData } from 'vitepress';
import docsearch from "@docsearch/js";
import "@docsearch/css";

const { theme } = useData();
const config = ref(theme.value.algoliaConfig || {});

onMounted(() => {
    docsearch({
        container: "#docsearch",
        appId: config.value.appId,
        apiKey: config.value.apiKey,
        indexName: config.value.indexName,
    });
})
</script>
