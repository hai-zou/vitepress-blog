<template>
    <div class="not-found-wrap">
        <h1 class="title">404</h1>

        <blockquote class="content">
            {{ getMsg() }}
        </blockquote>

        <a class="back-btn" href="/" aria-label="go to home">
            Take me home.
        </a>
    </div>
</template>

<script setup lang="ts">
const msgs = [
    "There's nothing here.",
    "How did we get here?",
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links."
]

function getMsg() {
    return msgs[Math.floor(Math.random() * msgs.length)]
}
</script>

<style scoped>
.not-found-wrap {
    text-align: center;
    margin-top: 4rem;
}

.not-found-wrap .title {
    font-size: 3rem;
    line-height: 1;
    color: var(--vp-c-text-1);
}

.not-found-wrap .content {
    font-size: 1.2rem;
    margin: 1rem 0;
    color: var(--vp-c-text-2);
}

.not-found-wrap .back-btn {
    color: var(--vp-c-brand);
    text-decoration: underline;
}
</style>
