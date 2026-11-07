import { defineHastPlugin } from 'satteri';

// Markdown image titles normally become hover tooltips, not visible captions.
// This plugin turns titles on standalone images into semantic <figure> and
// <figcaption> markup, keeping standard ![alt](src "caption") authoring syntax.
// It runs before Astro's image optimization and preserves the image/link nodes
// so local images remain optimized and linked images keep their destinations.
export const imageCaptions = defineHastPlugin({
    name: 'image-captions',
    element: {
        filter: ['p'],
        visit(node, ctx) {
            const children = node.children.filter(
                (child) => child.type !== 'text' || child.value.trim() !== '',
            );
            if (children.length !== 1) return;

            const content = children[0];
            const image = content.type === 'element' && content.tagName === 'a'
                && content.children.length === 1
                ? content.children[0]
                : content;
            if (image.type !== 'element' || image.tagName !== 'img') return;

            const caption = image.properties.title;
            if (typeof caption !== 'string' || !caption.trim()) return;

            // Replace the paragraph rather than nesting a block figure inside it.
            // Keep the original image/link nodes so optimization and links survive.
            ctx.setProperty(image, 'title', null);
            ctx.replaceNode(node, {
                type: 'element',
                tagName: 'figure',
                properties: { className: ['image-figure'] },
                children: [
                    content,
                    {
                        type: 'element',
                        tagName: 'figcaption',
                        properties: {},
                        children: [{ type: 'text', value: caption }],
                    },
                ],
            });
        },
    },
});
