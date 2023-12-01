// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import Layout from "./components/Layout.vue";
import Archive from "./pages/Archive.vue";
import Category from "./pages/Category.vue";
import FriendLinks from './pages/FriendLinks.vue';
import UtilCard from './pages/UtilCard.vue';

import "./styles/vars.css";
import "./styles/base.css";
import "./styles/custom-block.css";
import "./styles/vp-doc.css";
import "./styles/docsearch.css";
import "./styles/global.css";

// 图片放大插件
import fancyapps from "@fancyapps/ui/dist/fancybox/fancybox.umd";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
fancyapps.Fancybox.bind("[data-fancybox='gallery']", {
	Hash: false,
	Toolbar: {
		display: {
			left: ["infobar"],
			middle: [
				"zoomIn",
				"zoomOut",
				"toggle1to1",
				"rotateCCW",
				"rotateCW",
				"flipX",
				"flipY",
			],
			right: ["slideshow", "thumbs", "close"],
		}
	}
});

// 图片懒加载
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

export default {
	Layout,
	enhanceApp({ app }) {
		app.component("FriendLinks", FriendLinks);
		app.component("UtilCard", UtilCard);
        app.component("Archive", Archive);
        app.component("Category", Category);
	}
} satisfies Theme;
