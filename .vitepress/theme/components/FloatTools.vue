<template>
    <div class="float-tools-container">
        <BackTop />
        <a v-if="!!theme.algoliaConfig" class="float-tool-btn">
            <Search />
        </a>

		<a class="float-tool-btn" href="/rss.xml">
			<Rss class="p-icon" />
		</a>

        <ToggleTheme />
        <slot name="extra-tools" />
    </div>
</template>

<script setup lang="ts">
import BackTop from "./BackTop.vue";
import ToggleTheme from "./ToggleTheme.vue";
import Search from "./Search.vue";
import Rss from "../icons/Rss.vue";
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