import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';
import easyImport from 'postcss-easy-import';
import mixins from 'postcss-mixins';
import simpleVars from 'postcss-simple-vars';
import hexrgba from 'postcss-hexrgba';
import nested from 'postcss-nested';
import cssnano from 'cssnano';
import sugarss from 'sugarss';

export default {
    data: {
        permalink: 'css/styles.css'
    },

    async render () {
        const includesPath = path.join(import.meta.dirname, '../_includes');


        /*
         * Project css
         */
        const projectStylesFilepath = `${includesPath}/sss/styles.sss`;
        const projectRawCss = await fs.promises.readFile(projectStylesFilepath);

        const projectCss = await postcss([
            easyImport({
                extensions: '.sss'
            }),
            mixins,
            simpleVars,
            hexrgba,
            nested,
            cssnano
        ])
        .process(projectRawCss, {
            from: projectStylesFilepath,
            parser: sugarss
        })
        .then(result => result.css);


        /*
         * Plugins css
         */
        const pluginsStylesFilepath = `${includesPath}/css/styles.css`;
        const pluginsRawCss = await fs.promises.readFile(pluginsStylesFilepath);

        const pluginsCss = await postcss([
            easyImport({
                extensions: '.css'
            }),
            cssnano
        ])
        .process(pluginsRawCss, {
            from: pluginsStylesFilepath
        })
        .then(result => result.css);


        return `${pluginsCss}\n\n${projectCss}`;
    }
};
