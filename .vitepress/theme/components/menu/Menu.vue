<template>
    <ul class="menu-container">
        <li
            class="menu-item"
            v-for="item in navList"
            :key="item.link"
            :class="{ active: route.path.includes(item.link) }"
        >
            <template v-if="item.items && item.items.length">
                <a class="link" :href="item.link">
                    {{ item.text }}
                    <ArrowDown class="p-icon" />
                </a>
                <div class="sub-menu-wrap">
                    <SubMenu :items="item.items" />
                </div>
            </template>
            <template v-else>
                <a class="link" :href="item.link">{{ item.text }}</a>
            </template>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { useData, useRoute } from "vitepress";
import { computed } from "vue";
import SubMenu from "./SubMenu.vue";
import ArrowDown from "../../icons/ArrowDown.vue";

const { theme } = useData();
const route = useRoute();

const navList = computed(() => theme.value.nav);
</script>
  
<style scoped>
.menu-container {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    column-gap: 2rem;
    height: 100%;
}

.menu-container .menu-item {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    height: 100%;
}

.menu-item .link {
    padding: 2px 0;
    display: inline-flex;
    align-items: center;
    column-gap: 4px;
    color: var(--vp-c-text-1);
}

.menu-item .p-icon {
    width: 1rem;
    height: 1rem;
}

.menu-item.active .link {
    border-bottom: 2px solid var(--vp-c-brand);
    color: var(--vp-c-brand);
}

.menu-item:hover .sub-menu-wrap {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.menu-container .sub-menu-wrap {
    position: absolute;
    top: calc(100% - 1rem);
    right: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.25s, visibility 0.25s, transform 0.25s;
}
</style>
  