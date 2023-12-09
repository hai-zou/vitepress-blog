<template>
    <ArticleList :article-list="displayList" />
    <Pagination
        :page-index="pageIndex"
        :page-size="pageSize"
        :length="sortList.length"
        @pageChange="pageChange"
    />
    <ClientOnly>
        <WatchRoute @route-change="onRouteChange" />
    </ClientOnly>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useData } from "vitepress";
import { PageData } from '../types/interface';
import ArticleList from "./ArticleList.vue";
import Pagination from "./Pagination.vue";
import WatchRoute from "./WatchRoute.vue";

const { theme } = useData();
const list = computed<PageData[]>(() => theme.value.pages);
const displayList = ref<PageData[]>([]);
const pageIndex = ref(1);
const pageSize = ref(10);

function pageChange(pageEvent: { index: number }) {
    const { index } = pageEvent;
    pageIndex.value = index;
}

function onRouteChange(event: { pkg: number }) {
    const { pkg } = event;
    pageIndex.value = pkg;
    getList();
}

function getList() {
    const startIndex = (pageIndex.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    displayList.value = sortList.value.slice(startIndex, endIndex);
}

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

function cloneList(list: PageData[]) {
    return list.map(item => item);
}
</script>
