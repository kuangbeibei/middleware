/*
 * @Author: kuangdan
 * @Date: 2019-11-01 10:32:39
 * @Last Modified: 2019-11-01 10:32:39
 */

// 格式化时间
export function FormatTime(t) {
	return t.replace("T", " ").replace(/\+\d*\:00/, "");
}

// 判断是否是对象
function isObject(source) {
	const type = typeof source;
	return source !== null && (type === "object" || type === "function");
}

// 判断对象类型
function getType(source) {
	return Object.prototype.toString
		.call(source)
		.split(" ")[1]
		.slice(0, -1);
}

// 深拷贝
export function deepCloneObject(source, map = new WeakMap()) {
	if (!isObject(source)) return source;
	const type = getType(source);
    let cloneTarget = {};
    
	// 防止循环引用
	if (map.get(source)) {
		return map.get(source);
    }
    
    map.set(source, cloneTarget);
    
	if (type === "Object" || type === "Array") {
		let keys = type === "Object" ? Object.keys(source) : undefined; // 如果支持optional chaining的话可以写成?.
        (keys || source).forEach((val, key) => {
			if (keys) {
				key = val;
			}
			cloneTarget[key] = deepCloneObject(source[key], map); //在这里进行递归调用
		});
	}
	return cloneTarget;
}
