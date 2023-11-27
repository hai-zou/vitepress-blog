<template>
    <div class="link-container">
        <ul>
            <li class="link-item" v-for="item in links" :key="item.link">
                <a class="name" :href="item.link" target="_blank">{{ item.name }}</a>
                <span class="desc">{{ item.desc }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import links from "../../../data/links";
</script>

<style scoped>
.link-container {
    margin-top: 2rem;
}

.link-item {
	margin: 1rem 0;
}

.link-item .name {
	margin-right: 10px;
}
</style>