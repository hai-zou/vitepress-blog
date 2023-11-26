// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import { PoseidonTheme } from 'vitepress-theme-poseidon';
import FriendLinks from './components/FriendLinks.vue';
import UtilCard from './components/UtilCard.vue';
import './style.css';

export default {
	extends: PoseidonTheme,
	enhanceApp({ app }) {
		app.component("FriendLinks", FriendLinks);
		app.component("UtilCard", UtilCard);
	}
} satisfies Theme;
