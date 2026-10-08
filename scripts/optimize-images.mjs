import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";

const images = [
  { file: "1000045918.jpg", widths: [480, 750, 1080, 1440] },
  { file: "20260927_132803.jpg", widths: [480, 640, 750, 960, 1080, 1440, 1920] },
  { file: "20260927_132624.jpg", widths: [640, 960, 1440, 1920] },
  { file: "20260927_132724.jpg", widths: [640, 960, 1440, 1920] },
  { file: "nanaimo-tennis-logo.png", widths: [48, 96, 128] },
];
const output = path.resolve("public/optimized");
await mkdir(output, { recursive: true });
for (const { file, widths } of images) {
  const input = path.resolve("public", file);
  await stat(input); // Fail the build rather than deploy broken image paths.
  const name = path.parse(file).name;
  for (const width of widths) {
    const destination = path.join(output, `${name}-${width}.webp`);
    await sharp(input).rotate().resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 }).toFile(destination);
    const { size } = await stat(destination);
    console.log(`${path.relative(process.cwd(), destination)}: ${size} bytes`);
  }
}
