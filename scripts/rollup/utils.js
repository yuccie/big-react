import fs from 'fs'
import path from 'path'

// rollup现在无法直接处理ts，因此需要先转义
import ts from 'rollup-plugin-typescript2';
// 用于解析commonjs规范的
import cjs from '@rollup/plugin-commonjs';

const pkgPath = path.resolve(__dirname, '../../packages')
const distPath = path.resolve(__dirname, '../../dist/node_modules') // 这里只是模仿其他的三方库，让资源都输出到node_modules目录里

export function resolvePkgPath(pkgName, isDist) {
    if (isDist) {
        return `${distPath}/${pkgName}`  // 返回产物路径
    }
    return `${pkgPath}/${pkgName}` // 解析并返回资源路径
}

export function getPackageJSON(pkgName) {
    const path = `${resolvePkgPath(pkgName)}/package.json` // 读取对应目录里的json文件
    const str = fs.readFileSync(path, { encoding: 'utf-8' })
    return JSON.parse(str)
}

// 获取基本的rollup配置
export function getBaseRollupPlugins({ tyepscript = {} } = {}) {
    return [cjs(), ts(tyepscript)]
}