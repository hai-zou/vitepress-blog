<template>
    <div class="category-container">
        <ul class="category-list">
            <li
                v-for="category in categoryList"
                :key="category"
                :class="{ active: active === category }"
            >
                <a :href="'/categories/' + category">{{ category }}</a>
            </li>
        </ul>
        <ul class="category-wraper">
            <li class="category-item" v-for="item in pageList" :key="item.path">
                <a class="category-link" :href="item.path">
                    <span class="title">{{ item.title }}</span>
                    <span class="date">
                        {{ transTime(item.date) }}
                    </span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useData, useRoute } from "vitepress";
import { transTime } from "../utils/tools";
import { PageData } from "../types/interface";
import { VaryPageList } from "../utils/global";

const { theme } = useData();
const route = useRoute();
const active = ref("");

const varyPageList = VaryPageList.getInstance(theme.value.pages);
const categoriesMap = varyPageList.categoriesMap;
const categoryList = ref<string[]>(varyPageList.categoriesList);
const pageList = ref<PageData[]>([]);

onMounted(() => {
    const params = route.data.params;
    const { pkg } = params || {};
    active.value = pkg || "";

    if (active.value) {
        pageList.value = categoriesMap.get(active.value) || [];
    }
});
</script>

<style scoped>
.category-container {
    padding: 1rem 0;
}

.category-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 1.2rem;
    row-gap: 0.8rem;
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem;
}

.category-list li {
    margin: 0;
}

.category-list li a {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--vp-c-brand);
}

.category-list li:hover a {
    text-decoration: none;
}

.category-list li.active a {
    background-color: var(--vp-c-brand);
    color: var(--vp-c-bg);
}

.category-wraper {
    padding: 0;
    list-style: none;
}

.category-item {
    display: inline-flex;
    line-height: 2rem;
    width: 100%;
    min-width: 200px;
    cursor: pointer;
}

.category-item a {
    color: var(--vp-c-text-1);
}

.category-item:hover a {
    color: var(--vp-c-brand);
    text-decoration: none;
}

.category-link {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    column-gap: 1rem;
}

.category-link .title {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>