<template>
    <div class="float-tools-container">
        <BackTop />

        <div v-if="!!theme.algoliaConfig" class="float-tool-btn">
            <Search />
        </div>

		<a class="float-tool-btn" target="_blank" href="/rss.xml">
			<Rss class="p-icon" />
		</a>

        <a class="float-tool-btn" target="_blank" :href="'https://github.com/' + theme.repo">
			<Github class="p-icon" />
		</a>

        <slot name="extra-tools" />

        <ToggleTheme />
    </div>
</template>

<script setup lang="ts">
import BackTop from "./BackTop.vue";
import ToggleTheme from "./ToggleTheme.vue";
import Search from "./Search.vue";
import Rss from "../icons/Rss.vue";
import Github from "../icons/Github.vue";
import { useData } from 'vitepress';

const { theme } = useData();
</script>

<style scoped>
.float-tools-container {
    position: fixed;
    z-index: 20;
    right: 1rem;
    bottom: 4rem;
}
</style>