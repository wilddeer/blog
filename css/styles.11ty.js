import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

export default {
    data: {
        permalink: 'css/styles.css'
    },

    async render () {
        const entryFilepath = path.join(import.meta.dirname, '../_includes/css/styles.css');
        const rawCss = await fs.promises.readFile(entryFilepath);

        return await postcss([
            tailwindcss({
                optimize: {
                    minify: true
                }
            })
        ])
        .process(rawCss, {
            from: entryFilepath
        })
        .then(result => result.css);
    }
};
