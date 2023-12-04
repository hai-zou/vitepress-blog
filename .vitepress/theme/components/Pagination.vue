<template>
    <div class="pagination-container">
        <a
            :style="{ visibility: isShowPreBtn ? 'visible' : 'hidden' }"
            class="arrow"
            :href="preLink"
            @click="onPrePage()"
        >
            ← 上一页
        </a>
        <span class="page-index">{{ pageIndex }}</span>
        <a
            :style="{ visibility: isShowNextBtn ? 'visible' : 'hidden' }"
            class="arrow"
            :href="nextLink"
            @click="onNextPage()"
        >
            下一页 →
        </a>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    pageIndex: number;
    pageSize: number;
    length: number;
}>();
const emit = defineEmits(["pageChange"]);

const isShowPreBtn = computed(() => props.pageIndex > 1);
const isShowNextBtn = computed(() => props.pageIndex * props.pageSize < props.length);

const preLink = computed(() => {
    const preIndex = +props.pageIndex - 1;
    return isShowPreBtn.value ? `/${preIndex}.html` : "#";
});
const nextLink = computed(() => {
    const nextIndex = +props.pageIndex + 1;
    return isShowNextBtn.value ? `/${nextIndex}.html` : "#";
});

function onPrePage() {
    const prePage = props.pageIndex - 1
    emit("pageChange", { index: prePage });
}
function onNextPage() {
    const nextPage = props.pageIndex + 1
    emit("pageChange", { index: nextPage });
}
</script>

<style scoped>
.pagination-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1rem;
}

.pagination-container .arrow {
    color: var(--vp-c-text-2);
    cursor: pointer;
}

.pagination-container .arrow:hover {
    opacity: 0.6;
}

.pagination-container .page-index {
    font-size: 1.1rem;
}
</style>