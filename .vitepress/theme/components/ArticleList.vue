<template>
    <div class="article-item" v-for="article in displayList" :key="article.path">
        <PinToTop v-if="article.top" class="top-flag" />
        <h2 class="article-title">
            <a class="link" :href="article.path">
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
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useData, useRoute } from "vitepress";
import Pagination from "./Pagination.vue";
import Cate from "./post-info/Cate.vue";
import Time from "./post-info/Time.vue";
import PinToTop from "../icons/PinToTop.vue";
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

watch(() => route.path, () => {
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
    const startIndex = (pageIndex.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    displayList.value = sortList.value.slice(startIndex, endIndex);
}
</script>

<style scoped>
.article-item {
    position: relative;
    padding: 1rem 1.5rem;
    margin-bottom: 0.8rem;
    transition: all .3s;
    border-radius: 5px;
    background-color: var(--vp-main-bg);
}

.article-item:hover {
    box-shadow: 0 1px 15px 0 var(--vp-article-shadow);
}

.article-item .top-flag {
    position: absolute;
    top: -1px;
    right: 0;
    width: 2.5rem;
    height: 2.5rem;
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
