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
	let cloneTarget;

	// 防止循环引用
	if (map.get(source)) {
		return map.get(source);
	}

	map.set(source, cloneTarget);

	if (type === "Object") {
		cloneTarget = {};
	}

	if (type === "Array") {
		cloneTarget = [];
	}

	let keys = type === "Object" ? Object.keys(source) : undefined; // 如果支持optional chaining的话可以写成?.
	(keys || source).forEach((val, key) => {
		if (keys) {
			key = val;
		}
		cloneTarget[key] = deepCloneObject(source[key], map); //在这里进行递归调用
	});
	return cloneTarget;
}

// 生成key val的面包屑路由数据，使path和面包屑title一一对应
export const paramRegExp = /\:\w+/;
export const variable = `{variable}`
export function flattenRoutesAndGenerateBreadcrumbsData(arr) {
	const routes = deepCloneObject(arr);
	let res = {};

	function walk(data, res) {
		return data.reduce((prev, cur) => {
			let path = cur.key;
			if (paramRegExp.test(path)) {
				path = path.replace(paramRegExp, variable); // /rocketmq/:clusterId/rmqconsole/:id -> /rocketmq/{variable}/rmqconsole/{variable}
			}
			prev[path] = cur.breadcrumbTitle;
			if (cur.subs) {
				walk(cur.subs, res);
			}
			return prev;
		}, res);
	}

	return walk(routes, res);
}
