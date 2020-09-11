const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const yaml = require('js-yaml');

module.exports = config => {
    // Plugins
    config.addPlugin(syntaxHighlight);

    config.setDataDeepMerge(true);

    config.addDataExtension('yaml', contents => yaml.safeLoad(contents));

    config.addFilter('formatDate', (dateString, lang) => {
        const date = new Date(dateString);
        return +date;
    });

    // Passthrough
    config.addPassthroughCopy('posts/**/*.jpg');
    config.addPassthroughCopy('posts/**/*.png');
    config.addPassthroughCopy('posts/**/*.webp');
    config.addPassthroughCopy('fonts/*.woff2');

    return {
        markdownTemplateEngine: 'ejs'
    };
};
