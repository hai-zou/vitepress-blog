import { defineConfig } from 'vitepress';
import { getPages } from 'vitepress-theme-poseidon';
import { baseConfig } from 'vitepress-theme-poseidon';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	extends: baseConfig,
	title: "My Awesome Project",
	description: "A VitePress Site",
	themeConfig: {
		pages: await getPages(),
	},
})
