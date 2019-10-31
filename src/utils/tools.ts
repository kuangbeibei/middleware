/**
 * 时间格式化
 */

export function FormatTime(t) {
    return t.replace('T', ' ').replace(/\+\d*\:00/, '');
}