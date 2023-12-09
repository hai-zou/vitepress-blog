<template>
    <div class="article-item" v-for="article in articleList" :key="article.path">
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
</template>

<script setup lang="ts">
import { PageData } from '../types/interface';
import Cate from "./post-info/Cate.vue";
import Time from "./post-info/Time.vue";
import PinToTop from "../icons/PinToTop.vue";

defineProps<{ articleList: PageData[] }>();
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
