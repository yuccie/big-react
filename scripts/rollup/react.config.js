import { getPackageJSON, getBaseRollupPlugins, resolvePkgPath } from './utils'
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
        plugins: getBaseRollupPlugins(),
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