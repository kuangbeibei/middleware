/*
 * 列表需要过滤中文的情况
 * @Date: 2019-12-25 14:55:29 
 * @Last Modified: 2019-12-25 14:55:29 
 */ 

import { getKeysFromVal } from "@utils/tools";
 
export function filterKeywordswithChinese(value, record, dataIndex) {
    if (escape(value).indexOf("%u") < 0) {
        return record[dataIndex]
				? record[dataIndex].toString().includes(value)
				: false
    } else {
        // 包含中文
        // 最终还是要到record里面去找
        return function (data, pointer) {
            const keys = getKeysFromVal(data, value, pointer);
            return record[dataIndex] === keys[0] || false;
        }
    }
}