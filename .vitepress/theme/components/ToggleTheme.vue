<template>
    <div class="float-tool-btn theme-mode">
        <Clothes class="p-icon" />

        <ul class="theme-select-box">
            <li
                v-for="item in themeModeList"
                :key="item.value"
                class="theme-select-item"
                :class="{ active: theme === item.value }"
                @click="toggleTheme(item.value)"
            >
                {{ item.label }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { getThemeKey, setThemeKey, needSetTheme } from "../utils/theme";
import PubsubMode from "../utils/pubsub";
import Clothes from "../icons/Clothes.vue";

const darkThemeMq = ref<MediaQueryList>();
const htmlElement = ref<HTMLElement>();
const theme = ref("");
const themeModeList = ref([
    { label: '跟随系统', value: 'auto' },
    { label: '浅色模式', value: 'light' },
    { label: '深色模式', value: 'dark' },
]);

onMounted(() => {
    htmlElement.value = document.documentElement;
    darkThemeMq.value = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.value.addEventListener("change", themeChange);

    initTheme();
});

onUnmounted(() => {
    darkThemeMq.value?.removeEventListener("change", themeChange);
});

function initTheme() {
    const themeVal = getThemeKey();
    toggleTheme(themeVal);
}

function toggleTheme(val: string) {
    theme.value = val;
    setThemeKey(val);

    const toTheme = needSetTheme(val);
    setTheme(toTheme);
}

function setTheme(val: string) {
    htmlElement.value?.setAttribute("theme", val);
    PubsubMode.publish("theme", val);
}

const themeChange = (e) => {
    if (theme.value !== "auto") {
        return;
    }
    if (e.matches) {
        setTheme("dark");
    } else {
        setTheme("light");
    }
}
</script>

<style scoped>
.theme-mode {
    position: relative;
}
.theme-mode .theme-select-box {
    transform: scale(0);
    transform-origin: bottom right;
    position: absolute;
    bottom: 0;
    right: 1.5rem;
    background-color: var(--vp-main-bg);
    border-radius: 6px;
    box-shadow: 0 0 15px var(--vp-c-divider);
    border: 1px solid var(--vp-c-gray-1);
    padding: 0.8rem 0;
    width: 100px;
    transition: transform .2s ease-in-out;
}
.theme-mode:hover .theme-select-box {
    transform: scale(1);
}
.theme-select-item {
    line-height: 2rem;
    text-align: center;
}
.theme-select-item:hover {
    color: var(--vp-c-brand);
}
.theme-select-item.active {
    color: var(--vp-c-brand);
    background-color: var(--vp-c-gray-2);
}
</style>
