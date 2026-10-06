import fs from "node:fs";
import path from "node:path";

const IMAGE_EXT = /\.(png|jpe?g|webp|gif|avif)$/i;

export type ProjectImage = {
  id: string;
  src: string;
  file: string;
  height: number;
};

const HEIGHTS = [360, 480, 280, 420, 320];

/** Lee public/images/projects/{slug}. Las fotos nuevas aparecen al dejarlas en esa carpeta. */
export function listProjectImages(slug: string): ProjectImage[] {
  const dir = path.join(process.cwd(), "public", "images", "projects", slug);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => IMAGE_EXT.test(file))
    .sort((a, b) => a.localeCompare(b, "es"))
    .map((file, index) => ({
      id: `${slug}-${file}`,
      src: `/images/projects/${slug}/${file}`,
      file,
      height: HEIGHTS[index % HEIGHTS.length],
    }));
}
