## 1、初始化项目

使用 pnpm 初始化项目，相比于 npm、yarn 可以解决很多幽灵依赖（没有声明，但安装）的问题

[参考资料：现代前端工程为什么越来越离不开 Monorepo?](https://juejin.cn/post/6944877410827370504)

[pnpm 是凭什么对 npm 和 yarn 降维打击的](https://juejin.cn/post/7127295203177676837)

```js
pnpm i eslint - D - w // -w 是安装在根目录
// -w flag (or --workspace-root).

// eslint 初始化
npx eslint--init

//  pnpm i -D -w @typescript-eslint/eslint-plugin@latest, @typescript-eslint/parser@latest
// ERR_PNPM_SPEC_NOT_SUPPORTED_BY_ANY_RESOLVER  @typescript-eslint/eslint-plugin@latest, isn't supported by any available resolver.
// 这是因为 pnpm 不支持 @latest 这种语法，可以删掉重来
```

? How would you like to use ESLint? … 
  To check syntax only
❯ To check syntax and find problems
  To check syntax, find problems, and enforce code style

eslint 又可以检查语法，还可以发现问题，还可以修改代码风格，这里代码风格使用 prettier

```js
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [ // 继承别人的配置
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser", // eslint 没有办法直接解析 ts，这里需要先用ts parser解析
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint" // ts 规则的合集
  ],
  "rules": {}
}
```

eslint 本身可以做风格检查，为了防止与prettier冲突 ，可以将prettier集成到eslint中

* eslint-config-prettier：覆盖ESLint本身的规则配置
* eslint-plugin-prettier：用Prettier来接管修复代码即eslint --fix

[打包工具对比](https://bundlers.tooling.report/)

## 2、实现JSX

React项目结构：

* react（宿主环境无关的公用方法，比如createElement）
* react-reconciler（协调器的实现，宿主环境无关，核心所及所在）
* 各种宿主环境的包（比如浏览器环境react-dom，还有其他）
* shared（公用辅助方法，宿主环境无关）
