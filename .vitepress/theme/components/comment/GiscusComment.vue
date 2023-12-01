<template>
    <Giscus
        id="comments"
        :repo="config.repo"
        :repoId="config.repoId"
        :category="config.category"
        :categoryId="config.categoryId"
        :mapping="config.mapping"
        :term="config.term"
        :reactionsEnabled="config.reactionsEnabled"
        :emitMetadata="config.emitMetadata"
        :inputPosition="config.inputPosition"
        :theme="themeKey"
        :lang="config.lang"
        loading="lazy"
    ></Giscus>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { getThemeKey, needSetTheme } from "../../utils/theme";
import { GiscusOptions } from "../../types/interface";
import PubsubMode from "../../utils/pubsub";
import Giscus from "@giscus/vue";

const props = defineProps<{ options: GiscusOptions }>();
const config = computed<GiscusOptions>(() => props.options);

const themeKey = ref("");
const themeSub = ref("");

onMounted(() => {
    const key = getThemeKey();
    themeKey.value = needSetTheme(key);

    themeSub.value = PubsubMode.subscribe("theme", (val) => {
        themeKey.value = val;
    });
});

onUnmounted(() => {
    PubsubMode.unsubscribe("theme", themeSub.value);
});
</script>