import { getPackageJSON, getBaseRollupPlugins, resolvePkgPath } from './utils'
import generatePackageJSON from 'rollup-plugin-generate-package-json'

const { name, module } = getPackageJSON('react') // 从package.json里得到具体的name、module
const pkePagth = resolvePkgPath(name)
const pkgDistPath = resolvePkgPath(name, true)

export default [
    // react
    {
        input: `${pkePagth}/${module}`, // 比如 packages/index.ts
        output: {
            file: `${pkgDistPath}/index.js`,
            name: 'index.js',
            format: 'umd'
        },
        plugins: [...getBaseRollupPlugins(), generatePackageJSON({
            inputFolder: pkePagth,
            outputFolder: pkgDistPath,
            baseContents: ({ name, description, version }) => ({
                name,
                description,
                version,
                main: 'index.js' // 导出的是umd规范的包，因此用main字段
            })
        })],
    },
    // jsx-runtime
    {
        input: `${pkePagth}/src/jsx.ts`,
        output: [
            // jsx-runtime
            {
                file: `${pkgDistPath}/jsx-runtime.js`,
                name: 'jsx-runtime.js',
                format: 'umd'
            },
            // jsx-dev-runtime
            {
                file: `${pkgDistPath}/jsx-dev-runtime.js`,
                name: 'jsx-dev-runtime.js',
                format: 'umd'
            }
        ],
        //  (Note that you need plugins to import files that are not JavaScript)
        plugins: getBaseRollupPlugins()
    }
]