import { getPages } from "./pages.js";
import path from "path";
import fs from "fs";
import RSS from "rss";

const HostUrl = "https://www.luckyzh.cn";
const SiteAuthor = "Hai Zou";

const feed = new RSS({
	title: '旧梦',
	description: '学无止境！',
	feed_url: `${HostUrl}/rss.xml`,
	site_url: HostUrl,
	image_url: `${HostUrl}/favicon.ico`,
	managingEditor: SiteAuthor,
	webMaster: SiteAuthor,
	copyright: `2023 ${SiteAuthor}`,
	language: 'zh-CH',
	pubDate: new Date(),
});

const pageList = await getPages();

pageList.slice(0, 5).forEach(item => {
	feed.item({
		title: item.title,
		date: item.date,
		categories: item.categories,
		description: item.description.replace(/\s/g, '').substring(0, 100) + "...",
		url: `${HostUrl}${item.path}`,
		author: SiteAuthor,
	});
});

const xml = feed.xml({ indent: true });

const rssOutputDir = path.join(process.cwd(), ".vitepress/dist/rss.xml");

fs.writeFile(rssOutputDir, xml, (error) => {
	if (error) {
		console.error('写入RSS错误：', error);
	} else {
		console.log('RSS写入成功！');
	}
});
