---
title: 分享一个图片转 .webp 格式的脚本
date: 2023-12-01
category:
  - Node
---

```js
import sharp from "sharp";
import fs from "fs";
import path from "path";

const originDir = path.join(process.cwd(), "docs/public/article");
const outputDir = path.join(process.cwd(), "docs/public/images");

fs.readdir(originDir, (err, files) => {
	if (err) {
		console.error('读取文件夹内容时发生错误:', err);
	} else {
		transImg(files);
	}
});

function transImg(imgDirs) {
	const isExist = fs.existsSync(outputDir);
	if (!isExist) {
		fs.mkdirSync(outputDir);
	}

	imgDirs.forEach(item => {
		const img = path.join(originDir, item);
		const { name } = path.parse(img);
		const newPath = path.format({
			dir: outputDir,
			name,
			ext: ".webp"
		});
		sharp(img).toFormat('webp')
			.toFile(newPath, (err, info) => {
				if (err) {
					console.error(err);
				} else {
					console.log(info);
				}
			});
	});
}
```