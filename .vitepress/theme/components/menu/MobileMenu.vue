<template>
    <div class="mobile-menus-container">
        <nav class="navbar-links">
            <div
                class="navbar-links__item"
                v-for="item in navList"
                :key="item.link"
                :class="{ active: route.path.includes(item.link) }"
            >
                <div v-if="item.items && item.items.length" class="items-wrap">
                    <div class="menu-items" @click="open = !open" :class="{ open }">
                        <a class="link">{{ item.text }}</a>
                        <ArrowRight class="p-icon" />
                    </div>
                    <div class="sub-menu" v-if="open">
                        <template v-for="subItem in item.items" :key="subItem">
                            <MenuLink :item="subItem" @click="closeMobileMenu" />
                        </template>
                    </div>
                </div>
                <a v-else class="link" :href="item.link" @click="closeMobileMenu">
                    {{ item.text }}
                </a>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { useData, useRoute } from "vitepress";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { debounce } from "../../utils/tools";
import MenuLink from "./MenuLink.vue";
import ArrowRight from "../../icons/ArrowRight.vue";

const route = useRoute();
const emit = defineEmits(["close"]);
const { theme } = useData();
const navList = computed(() => theme.value.nav);
const open = ref(false);

function closeMobileMenu() {
    emit("close");
}

const cancelDebounce = debounce(() => {
    if (window.innerWidth > 768) { 
        closeMobileMenu();
    }
}, 300);

onMounted(() => {
    window.addEventListener("resize", cancelDebounce);
});

onUnmounted(() => {
    window.removeEventListener("resize", cancelDebounce);
});
</script>

<style scoped>
.mobile-menus-container {
    background-color: var(--vp-c-bg);
    overflow: auto;
}

.navbar-links {
    width: 85%;
    max-width: 800px;
    margin: 1rem auto 0;
}

.navbar-links .navbar-links__item {
    border-bottom: 1px solid var(--vp-c-divider);
}

.navbar-links__item .link {
    display: block;
    padding: 1rem 0;
}

.navbar-links__item .link:hover,
.navbar-links__item .menu-items:hover {
    color: var(--vp-c-brand);
}

.navbar-links__item.active .link {
    color: var(--vp-c-brand);
}

.navbar-links .menu-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.menu-items .p-icon {
    width: 1.2rem;
    height: 1.2rem;
}

.menu-items.open .p-icon {
    transform: rotate(90deg);
}

.navbar-links .sub-menu {
    padding-bottom: 1rem;
}
</style>
  