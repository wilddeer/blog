import fs from 'node:fs';
import path from 'node:path';
import ejsPlugin from '@11ty/eleventy-plugin-ejs';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import { load as yamlLoad } from 'js-yaml';
import fastglob from 'fast-glob';
import markdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import markdownItKbd from 'markdown-it-kbd';
import markdownItDiv from 'markdown-it-div';
import markdownItImplicitFigures from 'markdown-it-implicit-figures';
import markdownItImsize from 'markdown-it-imsize';
import markdownItMultimdTable from 'markdown-it-multimd-table';

export default config => {
    config.setTemplateFormats(['md', 'ejs', '11ty.js']);

    // EJS support moved out of core in Eleventy 3.0
    config.addPlugin(ejsPlugin, {
        _with: false,
        localsName: '$'
    });

    // Markdown-it options
    const markdownLib = markdownIt({
        html: true
    })
        .use(markdownItAttrs)
        .use(markdownItMultimdTable, {
            multiline:  true,
            rowspan:    true,
            headerless: true
        })
        .use(markdownItImsize)
        .use(markdownItImplicitFigures, {
            figcaption: true
        })
        .use(markdownItDiv)
        .use(markdownItKbd);

    config.setLibrary('md', markdownLib);

    // Support YAML data files
    config.addDataExtension('yaml', contents => yamlLoad(contents));

    // Plugins
    config.addPlugin(syntaxHighlight);

    // Passthrough
    config.addPassthroughCopy('fonts/*.woff2');
    config.addPassthroughCopy('js/*.js');
    config.addPassthroughCopy('css/*.css');
    config.addPassthroughCopy('pics/**/*.*');
    config.addPassthroughCopy('demos/**/*.*');
    config.addPassthroughCopy('_headers');

    // Copy the assets to the corresponding post folders
    config.on('eleventy.after', async () => {
        const base = 'posts';
        const paths = await fastglob(['**/*.{jpg,png,gif,webp,webm,css}'], {cwd: base});

        for (const entry of paths) {
            const srcPath = path.join(base, entry);
            const [
                lang,
                folder,
                fileName
            ] = entry.split('/');
            const slug = decodeURIComponent(folder.split(' – ')[1]).replace(/(\s|:)/g, '_').toLowerCase();
            const newPath = `_site/${lang === 'en' ? 'en/' : ''}${slug}/${fileName}`;

            await fs.promises.mkdir(path.dirname(newPath), {
                recursive: true
            });
            await fs.promises.copyFile(srcPath, newPath);
        }
    });

    return {
        markdownTemplateEngine: 'ejs'
    };
};
