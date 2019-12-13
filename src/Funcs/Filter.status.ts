/*
 * 过滤集群状态的Func
 * @Date: 2019-12-12 15:36:59 
 * @Last Modified: 2019-12-12 15:36:59 
 */

import { clusterStatus } from "@utils/data";

// 根据clusterStatus的value获取key
const getKeysFromVal = (obj, val, k?) => {
	let res = Array();
	Object.keys(obj).forEach(key => {
		if (obj[key][k] && obj[key][k].toString().includes(val)) {
			res.push(key)
		}
	});
	return res
}

export function filterClusterStatus(value, record, dataIndex) {
    if (escape(value).indexOf("%u") < 0) {
        // 没有包含中文
        return record[dataIndex]
				? record[dataIndex].toString().includes(value)
				: false
    } else {
        // 包含中文
        // 最终还是要到record里面去找
        const keys = getKeysFromVal(clusterStatus, value, 'text');
        return record[dataIndex] === keys[0] || false;
    }
}
