<template>
    <div class="page-container vp-doc">
        <div class="md-header">
            <h1 class="md-title">{{ frontmatter.title }}</h1>
            <div class="post-info">
                <Time :date="frontmatter.date || ''" />
                <Cate :category="frontmatter.category || []" />
            </div>
        </div>
        <Content />
        <!-- 相关文章推荐 Related articles -->
        <Related v-if="isShowRelated" />
        <slot name="page-bottom" />

        <Subscribe v-if="frontmatter.subscribe" />

        <template v-if="isShowComment">
            <GiscusComment
                v-if="commentConfig.type === 'giscus'"
                :options="commentConfig.options"
            />
            <ValineComment
                v-if="commentConfig.type === 'valine'"
                :options="commentConfig.options"
            />
        </template>

        <SiteFooter />
    </div>
</template>

<script setup lang="ts">
import Related from "./Related.vue";
import GiscusComment from "./comment/GiscusComment.vue";
import ValineComment from "./comment/ValineComment.vue";
import SiteFooter from "./Footer.vue";
import Cate from "./post-info/Cate.vue";
import Time from "./post-info/Time.vue";
import Subscribe from "../pages/Subscribe.vue";
import { useData } from "vitepress";
import { computed } from "vue";
import { CommentConfig } from "../types/interface";

const { frontmatter, theme } = useData();

const isShowRelated = computed(() => {
    if (frontmatter.value.customPage) return false;
    return frontmatter.value.related ?? true;
});

const commentConfig = computed<CommentConfig>(() => {
    return theme.value.commentConfig;
});

const isShowComment = computed(() => {
    return !frontmatter.value.hideComment && !!commentConfig.value;
});
</script>
  
<style scoped>
.page-container {
    padding: 1.5rem 0.5rem;
}

.page-container .md-title {
    font-size: 2rem;
    margin: 1rem 0;
    text-align: center;
}

.page-container .post-info {
    letter-spacing: 0.5px;
    color: var(--vp-c-text-2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    column-gap: 1.2rem;
    row-gap: 0.5rem;
}
</style>
  