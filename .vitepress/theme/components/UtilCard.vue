<template>
	<div class="util-card-container" :title="props.description">
		<a
			class="title"
			:href="props.link"
			target="_blank"
		>
			{{ props.title }}
		</a>
		<div class="desc">
			{{ props.description }}
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
    title: String,
    link: String,
    description: String,
});
</script>

<style lang="scss">
.util-card-container {
	display: inline-flex;
	flex-direction: column;
	row-gap: 1rem;
	padding: 1.2rem 0.6rem;
	text-align: center;
	border: 1px solid var(--vp-c-gray-1);
	border-radius: 8px;
	width: 10rem;
	box-sizing: border-box;

	.title {
		font-size: 1.1rem;
		cursor: pointer;
	}

	.desc {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 0.9rem;
	}
}
</style>