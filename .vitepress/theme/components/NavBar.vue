<template>
    <div class="nav-bar-container blur" :class="{ active: mobileMenuActive }">
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
    </div>
    <MobileMenu class="mobile-menus" @close="closeMobileMenu" />
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
    document.body.style.overflow = "auto";
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
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;
    width: 100%;
    height: var(--vp-nav-height);
    box-shadow: 0 2px 5px var(--vp-c-divider);
    background-color: var(--vp-header-bg);
}

.nav-bar-container.blur {
    -webkit-backdrop-filter: saturate(200%) blur(20px);
    backdrop-filter: saturate(200%) blur(20px);
}

.nav-bar {
    width: 85%;
    max-width: var(--vp-layout-max-width);
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

.nav-bar-container + .mobile-menus {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 10;
    padding-top: var(--vp-nav-height);
    transition: transform .3s cubic-bezier(.4,0,.2,1);
    transform: translateX(-100%);
}

.nav-bar-container.active + .mobile-menus {
    transform: translateX(0);
}
</style>
  