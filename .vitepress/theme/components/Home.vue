<template>
    <div class="home-container">
        <ClientOnly>
            <ArticleList />
        </ClientOnly>
        <SiteFooter />
    </div>
</template>

<script setup lang="ts">
import SiteFooter from "./Footer.vue";
import ArticleList from "./ArticleList.vue";
</script>
  
<style scoped>
.home-container {
    display: flex;
    flex-direction: column;
}
</style>
