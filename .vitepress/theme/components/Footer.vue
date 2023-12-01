<template>
    <div v-if="frontmatter.footer ?? true" class="footer-container">
        <div>© {{ displayYear }} | {{ site.title }}</div>
        <div>{{ site.description }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useData } from "vitepress";

const { site, theme, frontmatter } = useData();
const displayYear = ref(getYear());

function getYear() {
    const startTime = theme.value.startTime || new Date();
    const start = new Date(startTime).getFullYear();
    const year = new Date().getFullYear();
    return year > start ? `${start} - ${year}` : year;
}
</script>

<style scoped>
.footer-container {
    padding: 2rem 0;
    text-align: center;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
}
</style>