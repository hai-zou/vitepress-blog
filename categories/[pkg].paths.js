import { getPages } from "../scripts/pages.js";
import { VaryPageList } from "../.vitepress/theme/utils/global.ts";

export default {
    async paths() {
        const pageList = await getPages();
        const varyPageList = VaryPageList.getInstance(pageList);
        const categoryList = varyPageList.categoriesList;
        return categoryList.map(item => ({ params: { pkg: item } }));
    }
}