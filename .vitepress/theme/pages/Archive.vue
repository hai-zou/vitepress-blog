<template>
    <h2>共计 {{ total }} 篇文章！</h2>
    <div class="archive-container" v-for="yearItem in archiveList" :key="yearItem.year">
        <h3>{{ yearItem.year }}</h3>
        <ul class="article-wrap">
            <li class="article-item" v-for="articleItem in yearItem.children" :key="articleItem.path">
                <a :href="articleItem.path">
                    {{ articleItem.title }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useData } from "vitepress";
import { PageData } from "../types/interface";
import { VaryPageList } from "../utils/global";

interface ArchiveItem {
    year: number;
    children: PageData[];
}

const { theme } = useData();
const archiveList = ref<ArchiveItem[]>([]);
const total = ref(theme.value.pages.length);
const varyPageList = VaryPageList.getInstance(theme.value.pages);
const archiveMap = varyPageList.archiveMap;

onMounted(() => {
    for (const [ year, children ] of archiveMap) {
        archiveList.value.push({ year, children });
    }
});
</script>

<style scoped>
.archive-container {
    margin-top: 2rem;
}

.archive-container .article-wrap {
    margin: 0;
}

.archive-container .article-item {
    margin: 1rem 0;
}
</style>