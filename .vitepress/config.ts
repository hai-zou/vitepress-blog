import { UserConfig, defineConfig } from 'vitepress';
import { getPages } from 'vitepress-theme-poseidon/scripts/pages';
import { baseConfig } from 'vitepress-theme-poseidon/scripts/config';

// https://vitepress.dev/reference/site-config
export default defineConfig(<UserConfig<any>>{
	extends: baseConfig,
	title: "旧梦",
    description: "学无止境！",
    lang: "zh-CH",
    lastUpdated: true,
	appearance: false,
	head: [
        [ "meta", { name: "baidu-site-verification", content: "codeva-JdN4jbMZRk" } ],
        [ "meta", { name: "google-site-verification", content: "djOHUZEvT4rsmXBBvUZ5S0MjQ_7nRdwc49_D5_6uhPk" } ],
		// 开放图谱协议
		[ "meta", { property: "og:title", content: "旧梦" } ],
		[ "meta", { property: "og:site_name", content: "旧梦" } ],
		[ "meta", { property: "og:type", content: "website" } ],
		[ "meta", { property: "og:locale", content: "zh_CN" } ],
		[ "meta", { property: "og:url", content: "https://www.luckyzh.cn/" } ],
		[ "meta", { property: "og:description", content: "haizou的个人博客，分享一些杂七杂八的东西！" } ],
		// 霞骛文楷字体
		[
			"link",
			{
				rel: "stylesheet",
				href: "https://cdn.staticfile.org/lxgw-wenkai-screen-webfont/1.6.0/lxgwwenkaiscreen.css",
				media: "print",
				onload: "this.media='all'"
			}
		],
		// 谷歌分析
		[ "script", { async: "", src: "https://www.googletagmanager.com/gtag/js?id=G-WW5WXCXDFX" } ],
		[
			"script",
			{},
			`
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());
				gtag('config', 'G-WW5WXCXDFX');
			`
		]
    ],
	themeConfig: {
		pages: await getPages(),
		author: "Hizo",
        logo: "/favicon.ico",
		startTime: '2023-06-08 00:00:00',
        nav: [
            {
                text: "技术",
                items: [
                    { text: "JavaScript", link: "/categories?type=JavaScript" },
                    { text: "CSS", link: "/categories?type=CSS" },
                    { text: "Node", link: "/categories?type=Node" },
                    { text: "Vue", link: "/categories?type=Vue" },
                    { text: "Git", link: "/categories?type=Git" },
                    { text: "GitHub", link: "/categories?type=GitHub" },
                    { text: "Other", link: "/categories?type=Other" },
                ]
            },
            { text: "随笔", link: "/essay.html" },
            { text: "归档", link: "/archive.html" },
            { text: "友链", link: "/friends.html" },
            { text: "留言", link: "/messages.html" },
            { text: "关于", link: "/about.html" },
        ],
		giscusConfig: {
			repo: "hai-zou/vitepress-blog",
			repoId: "R_kgDOKwOEkg",
			category: "General",
			categoryId: "DIC_kwDOKwOEks4CbMoS",
			mapping: "pathname",
			placeholder: "Welcome to component!",
			inputPosition: "top",
			lang: "zh-CN",
		},
		algoliaConfig: {
			appId: "A6S1DCIE2I",
			apiKey: "ddcd005e9001a4d845451373d4460827",
			indexName: "luckyzh",
		}
	},
	sitemap: {
		hostname: 'https://www.luckyzh.cn',
	}
})
