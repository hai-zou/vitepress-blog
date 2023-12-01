<template>
    <div class="sub-menu-group">
        <p v-if="text" class="title">{{ text }}</p>

        <template v-for="item in items" :key="item">
            <MenuLink v-if="'link' in item" :item="item" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { NavItem } from "../../types/interface";
import MenuLink from "./MenuLink.vue"

defineProps<{ text: string; items: NavItem[] }>();
</script>

<style scoped>
.sub-menu-group {
    margin: 12px -12px 0;
    border-top: 1px solid var(--vp-c-divider);
    padding: 12px 12px 0;
}

.sub-menu-group:first-child {
    margin-top: 0;
    border-top: 0;
    padding-top: 0;
}

.sub-menu-group+.sub-menu-group {
    margin-top: 12px;
    border-top: 1px solid var(--vp-c-divider);
}

.title {
    padding: 0 12px;
    line-height: 32px;
    font-size: 14px;
    font-weight: 600;
    color: var(--vp-c-text-2);
    white-space: nowrap;
    transition: color 0.25s;
}
</style>
