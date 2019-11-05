/*
 * @Author: kuangdan 
 * @Date: 2019-11-01 10:32:39 
 * @Last Modified: 2019-11-01 10:32:39 
 */

 
// 格式化时间
export function FormatTime(t) {
    return t.replace('T', ' ').replace(/\+\d*\:00/, '');
}