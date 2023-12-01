<template>
    <div
        v-if="theme === 'light'"
        class="float-tool-btn"
        title="浅色主题"
        @click="toggleTheme('auto')"
    >
        <Sun class="p-icon" />
    </div>
    <div
        v-if="theme === 'dark'"
        class="float-tool-btn"
        title="深色主题"
        @click="toggleTheme('light')"
    >
        <Moon class="p-icon" />
    </div>
    <div
        v-if="theme === 'auto'"
        class="float-tool-btn"
        title="跟随系统"
        @click="toggleTheme('dark')"
    >
        <ThemeSwitch class="p-icon" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { getThemeKey, setThemeKey, needSetTheme } from "../utils/theme";
import PubsubMode from "../utils/pubsub";
import Sun from "../icons/Sun.vue";
import ThemeSwitch from "../icons/ThemeSwitch.vue";
import Moon from "../icons/Moon.vue";

const darkThemeMq = ref<MediaQueryList>();
const htmlElement = ref<HTMLElement>();
const theme = ref("");

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
