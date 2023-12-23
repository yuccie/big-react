import {
	Type,
	Key,
	Ref,
	Props,
	ReactElementType,
	ElementType
} from 'shared/ReactTypes';
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';

const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE, // 表示元素的类型，用于区分当前数据是否为reactElement，内部使用字段
		type, // 元素的
		key, // 元素的
		ref, // 元素的
		props, // 元素的
		__mark: 'djch' // 区别于真实react的一个字符串
	};

	return element;
};

// <div>
//   	<div>hello</div>
//     <div>world</div>
// </div>

// 参考babel编译后的代码

// import { jsx as _jsx } from 'react/jsx-runtime';
// import { jsxs as _jsxs } from 'react/jsx-runtime';
// /*#__PURE__*/ _jsxs('div', {
// 	children: [
// 		/*#__PURE__*/ _jsx('div', {
// 			children: 'hello'
// 		}),
// 		/*#__PURE__*/ _jsx('div', {
// 			children: 'world'
// 		})
// 	]
// });

// maybeChildren 是哪些值？？？❌
export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	let key: Key = null;
	let ref: Ref = null;
	const props: Props = {};

	for (const prop in config) {
		const val = config[prop];
		// 特殊处理 key，ref ？？？❌
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}

		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength) {
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else {
			props.children = maybeChildren;
		}
	}
	// 将处理过后的数据，传入到 ReactElement函数里，生成对应的节点
	return ReactElement(type, key, ref, props);
};

// 其实还可以封装 jsxDEV，从而在开发环境做更多的事情。与jsx的逻辑不同
export const jsxDEV = (type: ElementType, config: any) => {
	let key: Key = null;
	let ref: Ref = null;
	const props: Props = {};

	for (const prop in config) {
		const val = config[prop];
		// 特殊处理 key，ref ？？？❌
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}

		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	// 将处理过后的数据，传入到 ReactElement函数里，生成对应的节点
	return ReactElement(type, key, ref, props);
};
