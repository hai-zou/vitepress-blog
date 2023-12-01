import { getPages } from "./scripts/pages.js";

export default {
	async paths() {
		const list = await getPages();
		const length = list.length;
		const size = 10;
		const pages = (length % size === 0) ? (length / size) : (Math.floor(length / size) + 1);
		return new Array(pages).fill(0).map((_, index) => ({ params: { pkg: index + 1 } }));
	}
}