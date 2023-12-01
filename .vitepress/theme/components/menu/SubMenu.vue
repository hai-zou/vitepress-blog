<template>
    <div class="sub-menu">
        <div v-if="items" class="items">
            <template v-for="item in items" :key="item.text">
                <MenuLink v-if="'link' in item" :item="item" />
                <SubMenuGroup v-else :text="item.text" :items="item.items || []" />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import MenuLink from "./MenuLink.vue";
import SubMenuGroup from "./SubMenuGroup.vue";
import { NavItem } from "../../types/interface";

defineProps<{ items: NavItem[] }>();
</script>

<style scoped>
.sub-menu {
    border-radius: 12px;
    padding: 12px;
    min-width: 128px;
    border: 1px solid var(--vp-c-divider);
    background-color: var(--vp-c-bg-elv);
    box-shadow: var(--vp-shadow-3);
    transition: background-color 0.5s;
    max-height: calc(100vh - var(--vp-nav-height));
    overflow-y: auto;
}

.sub-menu :deep(.sub-menu-group) {
    margin: 0 -12px;
    padding: 0 12px 12px;
}

.sub-menu :deep(.sub-menu-group + .sub-menu-group) {
    border-top: 1px solid var(--vp-c-divider);
    padding: 11px 12px 12px;
}

.sub-menu :deep(.sub-menu-group:last-child) {
    padding-bottom: 0;
}

.sub-menu :deep(.sub-menu-group + .menu-link-wrap) {
    border-top: 1px solid var(--vp-c-divider);
    padding-top: 10px;
}

.sub-menu :deep(.menu-link-wrap) {
    /* padding: 0 16px; */
    white-space: nowrap;
}

.sub-menu :deep(.title) {
    flex-grow: 1;
    line-height: 28px;
    font-size: 12px;
    font-weight: 500;
    color: var(--vp-c-text-2);
    transition: color .5s;
}
</style>
