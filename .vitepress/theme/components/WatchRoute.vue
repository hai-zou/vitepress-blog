<template></template>

<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vitepress";

const route = useRoute();
const emit = defineEmits(["routeChange"]);

watch(() => route.path, () => {
    const params = route.data.params;
    const { pkg = 1 } = params || {};
    emit("routeChange", { pkg });
}, { immediate: true });
</script>