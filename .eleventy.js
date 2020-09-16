const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginInjector = require('@infinity-interactive/eleventy-plugin-injector');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const fastglob = require('fast-glob');

module.exports = config => {
    config.setDataDeepMerge(true);

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
