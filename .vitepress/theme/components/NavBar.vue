<template>
    <div class="nav-bar-container" :class="{ active: mobileMenuActive }">
        <header class="nav-bar">
            <h2 class="logo" @click="closeMobileMenu">
                <a href="/">{{ site.title }}</a>
            </h2>
            <div class="nav">
                <slot name="nav-search" />
                <Menu class="nav-menu" />
                <div class="toggle-menus" @click="toggleMenuActive">
                    <Close v-if="mobileMenuActive" class="p-icon" />
                    <More v-else class="p-icon" />
                </div>
            </div>
        </header>
        <MobileMenu class="mobile-menus" @close="closeMobileMenu" />
    </div>
</template>
  
<script setup lang="ts">
import { ref } from "vue";
import { useData } from "vitepress";
import Menu from "./menu/Menu.vue";
import MobileMenu from "./menu/MobileMenu.vue";
import More from "../icons/More.vue";
import Close from "../icons/Close.vue"

const { site } = useData();
const mobileMenuActive = ref(false);

function closeMobileMenu() {
    mobileMenuActive.value = false;
}
function toggleMenuActive() {
    mobileMenuActive.value = !mobileMenuActive.value;
    if (mobileMenuActive.value) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
}
</script>

<style scoped>
.nav-bar-container {
    width: 100%;
    border-bottom: 1px solid var(--vp-c-divider);
    height: var(--vp-nav-height);
}

.nav-bar {
    position: sticky;
    z-index: 11;
    width: 85%;
    max-width: var(--vp-layout-max-width);
    background-color: var(--vp-c-bg);
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.nav-bar .logo {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    cursor: pointer;
}

.nav-bar .nav {
    display: flex;
    align-items: center;
    gap: 2rem;
    height: 100%;
}

.nav-bar .toggle-menus {
    cursor: pointer;
    display: none;
}

.nav-bar-container .mobile-menus {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 10;
    transition: opacity .3s cubic-bezier(.4,0,.2,1);
    transform: translateY(-100%);
    opacity: 0;
}

.nav-bar-container.active .mobile-menus {
    top: var(--vp-nav-height);
    transform: translateY(0);
    opacity: 1;
}
</style>
  