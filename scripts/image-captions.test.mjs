import assert from 'node:assert/strict';
import test from 'node:test';
import { markdownToHtml, evaluate } from 'satteri';
import { imageCaptions } from '../src/plugins/image-captions.mjs';

const options = { hastPlugins: [imageCaptions] };

test('standalone images become semantic figures with literal captions', async () => {
    const { html } = await markdownToHtml(
        '![RAM](./ram.jpg "Top <old> & *new*")', options,
    );
    assert.equal(html.trim(), '<figure class="image-figure"><img src="./ram.jpg" alt="RAM"><figcaption>Top &lt;old&gt; &amp; *new*</figcaption></figure>');
});

test('linked images retain the destination and use the image title', async () => {
    const { html } = await markdownToHtml(
        '[![RAM](./ram.jpg "Old and new RAM")](https://example.com "Link title")', options,
    );
    assert.match(html, /<figure class="image-figure"><a href="https:\/\/example.com" title="Link title"><img src="\.\/ram.jpg" alt="RAM"><\/a><figcaption>Old and new RAM<\/figcaption><\/figure>/);
});

test('uncaptioned, inline, and multiple images keep their Markdown behavior', async () => {
    for (const source of [
        '![RAM](./ram.jpg)',
        '![RAM](./ram.jpg "   ")',
        'Text ![RAM](./ram.jpg "Tooltip") after.',
        '![RAM](./ram.jpg "First") ![Socket](./socket.jpg "Second")',
    ]) {
        assert.equal(
            (await markdownToHtml(source, options)).html,
            (await markdownToHtml(source)).html,
        );
    }
});

test('MDX layout wrappers retain captioned image nodes for Astro processing', async () => {
    const jsx = (type, props) => ({ type, ...props });
    const { default: Content } = await evaluate(
        '<div class="column">\n\n![RAM](./ram.jpg "Old and new RAM")\n\n</div>',
        { ...options, jsx, jsxs: jsx, Fragment: 'fragment' },
    );
    const wrapper = Content();
    assert.equal(wrapper.type, 'div');
    assert.equal(wrapper.class, 'column');
    const figure = wrapper.children;
    assert.equal(figure.type, 'figure');
    assert.equal(figure.children[0].type, 'img');
    assert.equal(figure.children[0].src, './ram.jpg');
    assert.equal(figure.children[0].title, undefined);
    assert.equal(figure.children[1].children, 'Old and new RAM');
});
