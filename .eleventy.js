const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const yaml = require('js-yaml');

module.exports = config => {
    config.setEjsOptions({
        rmWhitespace: true
    });

    config.setDataDeepMerge(true);

    // Support YAML data files
    config.addDataExtension('yaml', contents => yaml.safeLoad(contents));

    // Plugins
    config.addPlugin(syntaxHighlight);

    // Passthrough
    config.addPassthroughCopy('posts/**/*.jpg');
    config.addPassthroughCopy('posts/**/*.png');
    config.addPassthroughCopy('posts/**/*.webp');
    config.addPassthroughCopy('fonts/*.woff2');

    return {
        markdownTemplateEngine: 'ejs'
    };
};
