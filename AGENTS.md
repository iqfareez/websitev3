## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Base URL & Path

Prefix internal links with the configured base path so they work when the site is hosted under a subdirectory. Example:

```astro
const basePath = import.meta.env.BASE_URL.replace(/\/?$/, "/");
```

And then

```astro
<a href={`${basePath}about`}>About</a>
```

### Links between articles

In Markdown and MDX article content, prefer standard Markdown links such as `[Part 2](./hacking-wifi-captive-portal-2)` instead of HTML or JSX `<a>` tags. Use this `./` convention for links between articles.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
