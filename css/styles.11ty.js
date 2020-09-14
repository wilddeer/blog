const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

module.exports = {
    data: {
        permalink: 'css/styles.css'
    },

    async render () {
        const includesPath = path.join(__dirname, '../_includes');


        /*
         * Project css
         */
        const projectStylesFilepath = `${includesPath}/sss/styles.sss`;
        const projectRawCss = await fs.readFileSync(projectStylesFilepath);

        const projectCss = await postcss([
            require('postcss-easy-import')({
                extensions: '.sss'
            }),
            require('postcss-mixins'),
            require('postcss-simple-vars'),
            require('postcss-hexrgba'),
            require('postcss-nested'),
            require('cssnano')
        ])
        .process(projectRawCss, {
            from: projectStylesFilepath,
            parser: require('sugarss')
        })
        .then(result => result.css);


        /*
         * Plugins css
         */
        const pluginsStylesFilepath = `${includesPath}/css/styles.css`;
        const pluginsRawCss = await fs.readFileSync(pluginsStylesFilepath);

        const pluginsCss = await postcss([
            require('postcss-easy-import')({
                extensions: '.css'
            }),
            require('cssnano')
        ])
        .process(pluginsRawCss, {
            from: pluginsStylesFilepath
        })
        .then(result => result.css);


        return `${pluginsCss}\n\n${projectCss}`;
    }
};
