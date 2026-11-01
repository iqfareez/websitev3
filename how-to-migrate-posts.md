# Blog migration guide for agents

Use this workflow to migrate posts from `websitev2` into this Astro project. Migrate only the posts requested by the user, and keep the old codebase intact.

## 1. Inspect the current state

1. Read `AGENTS.md` and check `git status --short`. Preserve existing user changes.
2. Read the original post in full, including frontmatter, imports, custom components, code fences, links, and media references.
3. Check the current implementations before making assumptions:
   - `src/content.config.ts`: supported frontmatter and content loader.
   - `src/layouts/BlogPost.astro`: article layout and metadata display.
   - `src/components/Admonition.astro`: callout types and props.
   - Existing migrated posts in `src/content/blog/`: working examples.
4. Consult the relevant Astro documentation listed in `AGENTS.md`, especially content collections and Markdown/MDX.

The source codebase is:

```text
/Users/fareez/Documents/Development/webdev/websitev2
```

The target codebase is:

```text
/Users/fareez/Documents/Development/webdev/websitev3
```

## 2. Copy the post and map its metadata

Copy `websitev2/data/blog/<slug>.mdx` to `websitev3/src/content/blog/<slug>.mdx`. Preserve the filename so the article retains its `/blog/<slug>` route. Use `.mdx` when the article contains components or JSX.

Map the old frontmatter to the current schema:

| Old field | New field             | Handling                                                                               |
| --------- | --------------------- | -------------------------------------------------------------------------------------- |
| `title`   | `title`               | Preserve the original title.                                                           |
| `summary` | `description`         | Required; preserve the summary.                                                        |
| `date`    | `pubDate`             | Preserve publication date; normalize to quoted `YYYY-MM-DD`.                           |
| `lastmod` | `updatedDate`         | Optional; preserve the actual revision date and normalize it.                          |
| `images`  | `heroImage`           | Use the intended cover image, usually the first entry, with a relative asset path.     |
| `layout`  | Remove                | Astro applies `BlogPost.astro` through the blog route.                                 |
| `authors` | Remove                | The current collection has no author field or author rendering.                        |
| `tags`    | Check current support | Existing migrated posts retain this field, but the current schema does not expose it.  |
| `draft`   | Remove                | Ignore this field in the target frontmatter; delete it even when its value is `false`. |

Do not replace the original publication or revision date with the migration date.

For posts being migrated, remove the `draft` field from the target frontmatter.

Example target frontmatter:

```yaml
---
title: "Article title"
description: "Original article summary."
pubDate: "2022-08-14"
updatedDate: "2025-03-04"
heroImage: "../../assets/blog/article-images/cover.jpg"
---
```

Omit optional fields when the source does not provide them. A missing required description should be derived from the article without introducing new claims.

## 3. Copy and relink media

1. Inventory every local image used in the frontmatter and body, including images inside `<details>` and callouts.
2. Copy referenced files from `websitev2/public/static/blog/<folder>/` into `src/assets/blog/<folder>/` in this repository. Copy only the files needed for the requested post.
3. Preserve filenames, alt text, captions, and source attribution. Do not overwrite an existing asset with different contents.
4. Rewrite image references to paths relative to the new Markdown/MDX file:

```md
![Original alt text](../../assets/blog/article-images/screenshot.jpg)
```

5. Point `heroImage` at the copied cover image using the same relative path convention.
6. Preserve GIF animations. Astro may generate animated WebP files; verify animation, duration, and looping rather than requiring identical frame counts.
7. Keep remote images and their attribution links intact unless the user asks to download them. Distinguish external dependencies from copied local assets in validation.

Astro processes local Markdown images automatically. Do not introduce root-relative `/static/...` paths for migrated images.

## 4. Adapt MDX components

The old blog supplied some components globally. Import the corresponding Astro component explicitly after frontmatter:

```mdx
import Admonition from "../../components/Admonition.astro";

<Admonition type="note" title="Before you start">

You’ll need a **valid username and password**.

</Admonition>
```

Supported callout types are `warning`, `tip`, `caution`, `note`, `important`, and `question`. The type defaults to `note`; `title` is optional. Preserve the source’s callout type, custom title, and content.

Keep existing `<details>` and `<summary>` interactions, nested images, lists, inline code, and emphasis. Verify their compiled output: indentation can accidentally turn intended Markdown into a code block.

For other custom components, inspect their original implementation and reuse an existing equivalent where possible. Replace React/Next-specific imports and props with Astro-compatible markup. Record any unsupported feature rather than silently dropping it.

Preserve code examples and language labels. Check old code-fence metadata, such as `showLineNumbers`, separately; retaining that text does not mean Astro implements the feature. Reuse the site’s existing typography, Geist Mono font, syntax highlighting, and callout styling.

## 5. Convert and verify links

Follow `AGENTS.md`: use standard Markdown links in article content, including references between posts:

```md
[Part 2](./hacking-wifi-captive-portal-2)
[Authentication steps](./hacking-wifi-captive-portal-1#testing-and-verifying)
[Android section](#android)
```

- Use the requested `./<slug>` convention for links between articles. Do not replace these with JSX anchors or add a `basePath` export solely for article links.
- Preserve section fragments and check that they match generated heading IDs. For example, `Microsoft Windows` generates `#microsoft-windows`, not `#windows`.
- Update references in previously migrated posts when the new article becomes available, including links that still point to the old live site.
- Keep references to articles not yet migrated pointing to their existing live URLs until those articles are available locally.
- Preserve unrelated external links and URLs inside code examples.
- For navigation generated in Astro components, continue using the configured `BASE_URL` as instructed in `AGENTS.md`.

**Relative article links are URL-relative; asset paths are source-file-relative.** Test links against the actual rendered URL, including its trailing slash and any deployment base path. Do not assume a link works in production merely because it works in the current development tab. Report any development/production URL mismatch instead of silently changing the requested link convention.

## 6. Validate the migration

Run a production build:

```sh
pnpm build
```

This builds the static site and generates the CV PDF. It may need network access for Fontsource and permission to launch Playwright. Follow the environment’s normal approval process if those operations are blocked.

Verify the generated output:

- The migrated route exists at `dist/blog/<slug>/index.html` with the correct title, publication date, and optional update date.
- The post appears in the year-grouped blog list, RSS feed, and sitemap.
- Every generated local image URL points to an existing output file; counts match the source inventory, including the cover image.
- GIF-derived media remains animated and retains its intended duration and looping.
- Callouts, code examples, expandable sections, nested images, and Markdown formatting render correctly.
- Article links and fragments resolve to existing pages and heading IDs. Check reciprocal links where applicable.
- Development-only `/debug` pages remain absent from production output.

For browser checks, reuse an existing development server where possible. If starting one, use background mode:

```sh
pnpm dev --background
pnpm astro dev status
```

Use the URL Astro reports; the port may differ from `4321`. Manage the server with `pnpm astro dev logs` and `pnpm astro dev stop`.

Inspect the article at desktop and mobile widths. Open expandable sections and follow important internal links. Check image loading, code scrolling, wrapping, and readable callouts. Fix migration-specific problems without redesigning shared components or rewriting the article’s technical instructions.

Finish with `git diff --check` and review the diff. Confirm that changes are limited to the requested posts, their assets, and necessary references. Do not commit, push, publish, or delete source posts unless requested.

## 7. Report completion

Return the migrated article route, a brief description of what moved, and the checks completed. Mention any remaining broken external dependency, unsupported component feature, or unresolved link behavior. Distinguish migration changes from editorial changes.
