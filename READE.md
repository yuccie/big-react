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


```js
<div>hello</div>

// babel转义后  此时 react runtime 是 automatic模式，在react 17之后，都是转为 jsx，如下
import { jsx as _jsx } from "react/jsx-runtime";
/*#__PURE__*/_jsx("div", {
  children: "hello"
});

// 在react 17之前，都是转义的下面
/*#__PURE__*/React.createElement("div", null, "hello");
```

包括两部分：
- 编译时
- 运行时：jsx方法或React.createElement方法的实现（包括dev、prod两个环境）

编译时由babel编译实现，我们来实现运行时，工作量包括：

1. 实现jsx方法
2. 实现打包流程
3. 实现调试打包结果的环境


在mono-repo仓库中，如果依赖了当前仓库的文件，写法如下
```json
	"dependencies": {
		"shared": "workspace:*"
	},
```

## 3、实现jsx的打包

 >RollupError: Node tried to load your configuration file as CommonJS even though it is likely an ES module. To resolve this, change the extension of your configuration to ".mjs", set "type": "module" in your package.json file or pass the "--bundleConfigAsCjs" flag.

在打包时，配置文件都是ejs模式，而rollup默认加载配置的方式的cjs，因此需要添加特殊标识 `--bundleConfigAsCjs`，或者其他的方式，上面注释有


- rimraf 模块是为了兼容window系统，在mac系统下，可以直接使用 rm -rf


- rollup-plugin-generate-package-json 自动生成打包产物里的package.json

## 2-3、实现第一种调试方式

进入到指定的目录，比如 `dist/node_modules/react/` 里 使用` pnpm link --global` 将当前react连接到全局，也就是说全局变量下的 react 目前就是  `dist/node_modules/react/`，然后在新建项目，使用` pnpm link react --global`依赖这个

在新起的react demo中，打印React，和一个自定义的jsx，查看结果，然后再使用自己的react，同样打印，会发现不同，这是因为jsx在开发环境使用的jsxDEV。