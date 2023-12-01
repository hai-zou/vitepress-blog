<template>
    <div class="menu-link-wrap">
        <a
            class="menu-link"
            :class="{ active: routeLink === item.link }"
            :href="item.link"
        >
            {{ item.text }}
        </a>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";
import { NavItem } from "../../types/interface";

defineProps<{ item: NavItem }>();

const { page } = useData();

const routeLink = computed(() => {
    const link = page.value.relativePath.replace(".md", ".html");
    return `/${link}`;
});
</script>

<style scoped>
.menu-link {
    display: block;
    border-radius: 6px;
    padding: 0 12px;
    line-height: 32px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-1);
    white-space: nowrap;
    transition: background-color 0.25s, color 0.25s;
}

.menu-link:hover {
    color: var(--vp-c-brand);
    background-color: var(--vp-c-bg-elv-mute);
}

.menu-link.active {
    color: var(--vp-c-brand);
}
</style>
