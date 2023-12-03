<template>
    <div class="home-container">
        <div class="article-item" v-for="article in displayList" :key="article.path">
            <h2 class="article-title">
                <a class="link" :href="article.path">
                    <span v-if="article.top" class="top-flag">[置顶]</span>
                    {{ article.title || "" }}
                </a>
            </h2>
            <div class="article-line"></div>
            <div class="article-abstract">
                {{ article.description || '' }}
            </div>
            <div class="article-meta">
                <Time :date="article.date" />
                <Cate :category="article.category" />
            </div>
        </div>

        <Pagination
            :page-index="pageIndex"
            :page-size="pageSize"
            :length="sortList.length"
            @pageChange="pageChange"
        />
        <SiteFooter />
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useData, useRoute } from "vitepress";
import Pagination from "./Pagination.vue";
import SiteFooter from "./Footer.vue";
import Cate from "./post-info/Cate.vue";
import Time from "./post-info/Time.vue";
import { PageData } from '../types/interface';

const { theme } = useData();
const list = computed<PageData[]>(() => theme.value.pages);
const displayList = ref<PageData[]>([]);
const route = useRoute();
const pageIndex = ref(1);
const pageSize = ref(10);

// 1. 先按排序置顶文章
// 2. 再按时间倒序排序
const sortList = computed(() => {
    const allList = cloneList(list.value);
    return allList.sort((a, b) => {
        if (a.top === b.top) {
            return b.date! - a.date!;
        }
        return b.top! - a.top!;
    });
});

watch(route, () => {
    const params = route.data.params;
    const { pkg } = params || {};
    pageIndex.value = pkg || 1;
    getList();
}, { immediate: true });

function cloneList(list: PageData[]) {
    return list.map(item => item);
}

function pageChange(pageEvent) {
    const { index } = pageEvent;
    pageIndex.value = index;
}
function getList() {
    const index = pageIndex.value;
    const size = pageSize.value;
    const startIndex = (index - 1) * size;
    const endIndex = startIndex + size;
    displayList.value = sortList.value.slice(startIndex, endIndex);
}
</script>
  
<style scoped>
.home-container {
    display: flex;
    flex-direction: column;
}

.article-item {
    width: 100%;
    padding: 2rem 0.5rem;
    border-bottom: 1px solid var(--vp-c-divider);
}

.article-item .top-flag {
    color: var(--vp-c-red);
}

.article-item:hover .article-title {
    color: var(--vp-c-brand);
}

.article-item:hover .article-line {
    width: 5rem;
    border-color: var(--vp-c-brand);
}

.article-item .article-title {
    font-size: 1.4rem;
    font-weight: 700;
    transition: all .3s ease-out 0s;
    margin: 0.5rem 0;
    border: none;
    cursor: pointer;
}

.article-item .article-title .link {
    display: block;
}

.article-item .article-line {
    transition: all 0.3s ease-out;
    border-top: 2px solid var(--vp-c-text-1);
    display: block;
    width: 2rem;
}

.article-item .article-abstract {
    line-height: 1.5;
    margin: 1rem 0;
    color: var(--vp-c-text-2);
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;  /*限制行数*/
    line-clamp: 2;          /*限制行数*/
    letter-spacing: .5px;
}

.article-item .article-meta {
    color: var(--vp-c-gray);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 1.5rem;
    row-gap: 0.5rem;
}
</style>
  