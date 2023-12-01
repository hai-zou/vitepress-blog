<template>
    <span v-if="hasCategories" class="post-item">
        <Folder class="p-icon" />
        <a
            class="cate-item"
            v-for="cate in props.category"
            :key="cate"
            :href="'/categories.html?type=' + cate"
        >
            {{ cate }}
        </a>
    </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Folder from "../../icons/Folder.vue";

const props = defineProps<{ category: string[] }>();

const hasCategories = computed(() => {
    const cate = props.category;
    return Array.isArray(cate) && cate.length;
});
</script>
