const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const yaml = require('js-yaml');

module.exports = config => {
    config.addPlugin(syntaxHighlight);

    config.setDataDeepMerge(true);

    config.addDataExtension('yaml', contents => yaml.safeLoad(contents));

    config.addPassthroughCopy('posts/**/*.jpg');
    config.addPassthroughCopy('posts/**/*.png');
    config.addPassthroughCopy('posts/**/*.webp');

    return {
        markdownTemplateEngine: 'ejs'
    };
};
