<template>
    <div class="layout-container">
        <NavBar>
            <template #nav-search><slot name="nav-search" /></template>
        </NavBar>

        <div class="main-container">
            <NotFound v-if="page.isNotFound" />
            <Home v-else-if="frontmatter.home" />
            <Page v-else>
                <template #page-bottom><slot name="page-bottom" /></template>
            </Page>
        </div>

        <FloatTools>
            <template #extra-tools><slot name="extra-tools" /></template>
        </FloatTools>
    </div>
</template>
  
<script setup lang="ts">
import NavBar from "./NavBar.vue";
import Home from "./Home.vue";
import Page from "./Page.vue";
import NotFound from "./NotFound.vue";
import FloatTools from "./FloatTools.vue";
import { useData } from "vitepress";

const { frontmatter, page } = useData();
</script>

<style scoped>
.layout-container .main-container {
    width: 85%;
    max-width: var(--vp-layout-max-width);
    margin: var(--vp-nav-height) auto 0;
}
</style>
  