const supportSymbol = typeof Symbol === 'function' && Symbol.for;

// 如果支持，则生成一个独一无二的类型（也是为了防止滥用react element），否则用一个数字代替
export const REACT_ELEMENT_TYPE = supportSymbol
	? Symbol.for('react element')
	: 0xaecf17;
