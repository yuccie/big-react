import { getPackageJSON, getBaseRollupPlugins, resolvePkgPath } from './utils'
const { name, module } = getPackageJSON('react') // 从package.json里得到具体的name、module
const pkePagth = resolvePkgPath(name)
const pkgDistPath = resolvePkgPath(name, true)
export default [
    {
        input: `${pkePagth}/${module}`, // 比如 packages/index.ts
        output: {
            file: `${pkgDistPath}/index.js`,
            name: 'index.js',
            format: 'umd'
        },
        plugins: getBaseRollupPlugins(),
    }
]