import { PageData } from "../types/interface";

// 循环文章列表生成的数据
export class VaryPageList {
    static instance: VaryPageList | null = null;
    static getInstance(list: PageData[]) {
        if (!VaryPageList.instance) {
            VaryPageList.instance = new VaryPageList(list);
        }
        return VaryPageList.instance;
    }
    private list: PageData[] = [];

    // 分类列表
    public categoriesList: string[] = [];
    // Map映射：分类 -> 文章列表
    public categoriesMap: Map<string, PageData[]> = new Map();
    // Map映射：年份 -> 文章列表
    public archiveMap: Map<number, PageData[]> = new Map();

    private constructor(list: PageData[]) {
        this.list = list || [];
        this.handlePageList();
    }

    private handlePageList(): void {
        for (const pageItem of this.list) {
            const category = pageItem.category || [];
            for (const cateItem of category) {
                if (!this.categoriesMap.has(cateItem)) {
                    this.categoriesMap.set(cateItem, []);
                }
                if (this.categoriesList.indexOf(cateItem) === -1) {
                    this.categoriesList.push(cateItem);
                }
                this.categoriesMap.get(cateItem)?.push(pageItem);
            }

            const date = pageItem.date;
            if (!date) continue;
            const year = new Date(date).getFullYear();
            if (!this.archiveMap.has(year)) {
                this.archiveMap.set(year, []);
            }
            this.archiveMap.get(year)?.push(pageItem);
        }
    }
}
