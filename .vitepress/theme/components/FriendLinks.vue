<template>
    <div class="link-container">
        <ul>
            <li class="link-item" v-for="item in links" :key="item">
                <a class="name" :href="item.link" target="_blank">{{ item.name }}</a>
                <span class="desc">{{ item.desc }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import links from "../../../data/links";
</script>

<style lang='scss'>
.link-container {
    margin-top: 2rem;

    .link-item {
        margin: 1rem 0;

        .name {
            margin-right: 10px;
        }
    }
}
</style>