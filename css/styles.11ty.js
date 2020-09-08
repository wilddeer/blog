const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

module.exports = {
    data: {
        permalink: 'css/styles.css'
    },

    async render () {
        const rawDirPath = path.join(__dirname, '../_includes/sss');
        const rawFilepath = `${rawDirPath}/styles.sss`;
        const rawCss = await fs.readFileSync(rawFilepath);

        return await postcss([
            require('postcss-easy-import')({
                extensions: '.sss'
            }),
            require('postcss-simple-vars'),
            require('postcss-mixins'),
            require('postcss-color-mix'),
            require('postcss-nested'),
            // require('cssnano')
        ])
        .process(rawCss, {
            from: rawFilepath,
            parser: require('sugarss')
        })
        .then(result => result.css);
    }
};
