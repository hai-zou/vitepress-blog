import { defineConfigWithTheme } from 'vitepress';
import { getPages } from '../scripts/pages.js';

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<any>({
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
        repo: 'hai-zou/vitepress-blog',
        nav: [
            {
                text: "技术",
                items: [
                    { text: "JavaScript", link: "/categories/JavaScript.html" },
                    { text: "CSS", link: "/categories/CSS.html" },
                    { text: "Node", link: "/categories/Node.html" },
                    { text: "Vue", link: "/categories/Vue.html" },
                    { text: "Git", link: "/categories/Git.html" },
                    { text: "GitHub", link: "/categories/GitHub.html" },
                    { text: "Other", link: "/categories/Other.html" },
                ]
            },
            { text: "随笔", link: "/essay.html" },
            { text: "归档", link: "/archive.html" },
            { text: "友链", link: "/friends.html" },
            { text: "留言", link: "/messages.html" },
            { text: "关于", link: "/about.html" },
        ],
        commentConfig: {
            type: "valine",
            options: {
                appId: "XXZEyuLDolX9MAHmxNSYLAzy-gzGzoHsz",
                appKey: "qzv88EGymhIWw3vRh1RO4M3J",
            }
        },
        algoliaConfig: {
            appId: "A6S1DCIE2I",
            apiKey: "ddcd005e9001a4d845451373d4460827",
            indexName: "luckyzh",
        }
    },
    sitemap: {
        hostname: 'https://www.luckyzh.cn',
    },
    markdown: {
        theme: "material-theme-palenight",
        lineNumbers: true,
        config: (md) => {
            const defaultRender = md.renderer.rules.image;

            md.renderer.rules.image = (...args) => {
                const [tokens, idx] = args;
                const token = tokens[idx];
                const src = token.attrGet("src");
                const alt = token.content || "";

                // 移除原来的 src 属性
                token.attrSet("src", "");
                // 添加img标签属性
                token.attrSet("data-src", src);
                token.attrSet("class", "lazyload");

                // 生成新的 a 标签并包裹 img 标签
                const link = `
                <a
                    href="${src}"
                    data-fancybox="gallery"
                    data-caption="${alt}"
                >
                    ${defaultRender(...args)}
                </a>`;
                return link;
            };
        }
    },
    vue: {
        template: {
            // 将所有带短横线的标签名都视为自定义元素
            compilerOptions: { isCustomElement: (tag) => tag.includes("-") },
        },
    },
})
