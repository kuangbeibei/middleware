/*
 * @Author: kuangdan
 * @Date: 2019-11-01 10:32:39
 * @Last Modified: 2019-11-01 10:32:39
 */
// 格式化时间
export function FormatTime(t) {
	return t.replace("T", " ").replace("Z", "").replace(/\+\d*\:00/, "");
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

// 判断奇偶
export const isEven = (num) => {
	return num%2 === 0
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


// 设置cookie
export const setCookie = function (name, value, daysToLive?) {
	let cookie = `${name}=${encodeURIComponent(value)};`
	
	if (typeof daysToLive === 'number') {
		cookie += `max-age=${(daysToLive * 24 * 60 * 60)}`;
	}

	document.cookie = cookie;
}

// 生成随机整数
export const generateInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// 从对象中，获取英文对应的国际化中文
export const getKeysFromVal = (obj, val, k?) => {
	let res = Array();
	Object.keys(obj).forEach(key => {
		if (obj[key][k] && obj[key][k].toString().includes(val)) {
			res.push(key)
		}
	});
	return res
}