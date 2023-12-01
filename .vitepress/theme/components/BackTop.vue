<template>
    <div
        class="float-tool-btn"
        title="返回顶部"
        :class="{ hide: !isVisible }"
        @click="onBackTop"
    >
        <Top class="p-icon" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import Top from "../icons/Top.vue";

const isVisible = ref(false);

const handleVisible = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > 50) {
        isVisible.value = true;
    } else {
        isVisible.value = false;
    }
};

function onBackTop() {
    window.scrollTo(0, 0);
}

onMounted(() => {
    window.addEventListener("scroll", handleVisible);
});
onUnmounted(() => {
    window.removeEventListener("scroll", handleVisible);
});
</script>
