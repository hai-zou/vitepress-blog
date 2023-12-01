<template>
    <time v-if="props.date" class="post-item">
        <Calendar class="p-icon" />
        {{ transTime(props.date) }}
    </time>
</template>

<script setup lang="ts">
import { transTime } from "../../utils/tools";
import Calendar from "../../icons/Calendar.vue";

const props = defineProps<{ date: string | number }>();
</script>