import type { ImageMetadata } from "astro";

export interface Project {
  title: string;
  description: string;
  imgSrc: ImageMetadata;
  href?: string;
}
