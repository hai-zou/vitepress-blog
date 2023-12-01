<template>
    <div class="commits-container">
        <ul class="commit-list">
            <li v-for="item in commitList" :key="item.sha" class="commit-item">
                <p class="message">{{ item.commit.message }}</p>
                <p class="date">{{ item.commit.committer.date }}</p>
            </li>
        </ul>
        <footer class="commit-footer">
            <div v-if="commitList.length" class="loading-more">
                <a @click="loadingMore">加载更多</a>
            </div>
            <div v-else class="no-data">暂无数据</div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const commitList = ref([]);
const isLoading = ref(false);
const pageIndex = ref(1);

function getCommitList(page: number) {
    isLoading.value = true;
    fetch(`https://api.github.com/repos/hai-zou/vitepress-blog/commits?page=${page}&per_page=10`)
        .then(response => response.json())
        .then(data => {
            isLoading.value = false;
            commitList.value.push(...data);
        })
        .catch(() => {
            isLoading.value = false;
        });
}
function loadingMore() {
    getCommitList(++pageIndex.value);
}

onMounted(() => {
    getCommitList(pageIndex.value);
});
</script>

<style scoped>
.commits-container .title {
    text-align: center;
    margin-top: 2rem;
    font-size: 1.8rem;
}

.commit-list {
    padding-left: 1.25rem;
}

.commit-item {
    padding: 0.5rem 1rem;
    border-bottom: 1px solid var(--vp-c-divider);
}

.commit-item .message {
    font-size: 1.2rem;
    font-weight: 600;
}

.commit-item .date {
    color: var(--vp-c-text-2);
}

.commit-footer .no-data {
    padding-top: 4rem 0;
    text-align: center;
    color: var(--vp-c-text-2);
}

.commit-footer .loading-more {
    color: var(--vp-c-text-2);
    margin: 1.5rem 0 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
}

.commit-footer .loading-more a {
    cursor: pointer;
    border-bottom: none;
}
</style>