<template>
    <h2>相关文章推荐</h2>
    <ul>
        <li v-for="article in relatedList" :key="article.path">
            <a :href="article.path">
                {{ article.title }}
            </a>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";
import { VaryPageList } from "../utils/global";
import { PageData } from "../types/interface";

const { frontmatter, theme } = useData();

const varyPageList = VaryPageList.getInstance(theme.value.pages);
const categoriesMap = varyPageList.categoriesMap;

const relatedList = computed<PageData[]>(() => {
    const cateList = frontmatter.value.category;
    const title = frontmatter.value.title;

    if (!Array.isArray(cateList)) return [];

    return cateList.reduce((acc, key) => {
        const items = categoriesMap.get(key) || [];
        for (const article of items) {
            if (article.title === title) {
                continue;
            }
            acc.push(article);
        }
        return acc;
    }, [] as PageData[]);
});
</script>