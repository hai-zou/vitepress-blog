import { globby } from "globby";
import fs from "fs";
import matter from "gray-matter";

export const getPages = async () => {
    const paths = await globby(["**.md"], {
        ignore: ['node_modules', 'README.md']
    });

    return paths.map((item) => {
        const file = fs.readFileSync(item, { encoding: "utf8" });
        const { data, content } = matter(file);
        const { date, top, ...others } = data || {};

        return {
            path: `/${item.replace(".md", ".html")}`,
            description: content,
            date: date ? new Date(date).getTime() : 0,
            top: top || 0,
            ...others,
        };
    }).filter((item) => !item.customPage).sort((a, b) => b.date - a.date);
};
