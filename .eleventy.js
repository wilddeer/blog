const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginInjector = require('@infinity-interactive/eleventy-plugin-injector');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const fastglob = require('fast-glob');
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItKdb = require('markdown-it-kbd');
const markdownItDiv = require('markdown-it-div');
const markdownItImplicitFigures = require('markdown-it-implicit-figures');
const markdownItImsize = require('markdown-it-imsize');

module.exports = config => {
    config.setDataDeepMerge(true);

    // EJS config
    config.setEjsOptions({
        _with: false,
        localsName: '$'
    });

    // Markdown-it options
    const markdownLib = markdownIt({
        html: true
    })
        .use(markdownItImsize)
        .use(markdownItImplicitFigures, {
            figcaption: true
        })
        .use(markdownItDiv)
        .use(markdownItAttrs)
        .use(markdownItKdb);

    config.setLibrary('md', markdownLib);

    // Support YAML data files
    config.addDataExtension('yaml', contents => yaml.safeLoad(contents));

    // Plugins
    config.addPlugin(syntaxHighlight);

    // Passthrough
    config.addPassthroughCopy('fonts/*.woff2');

    // Copy the assets to the corresponding post folders
    config.addPlugin(pluginInjector, {
        inject: async (instance, options, file) => {
            const base = 'posts';
            const paths = await fastglob(['**/*.{jpg,png,gif,webp,webm}'], {cwd: base});

            paths.forEach(async entry => {
                console.log('[asets copy] Processing', entry);

                const srcPath = path.join(base, entry);
                const [
                    lang,
                    folder,
                    fileName
                ] = entry.split('/');
                const slug = folder.split(' – ')[1].replace(/\s/g, '_');

                console.log('[asets copy] Slug', slug);

                const newPath = `_site/${lang === 'en' ? 'en/' : ''}${slug}/${fileName}`;

                console.log('[asets copy] New path', newPath);

                await fs.promises.mkdir(path.dirname(newPath), {
                    recursive: true
                });
                await fs.promises.copyFile(srcPath, newPath);
            });
        }
    });

    return {
        markdownTemplateEngine: 'ejs'
    };
};
