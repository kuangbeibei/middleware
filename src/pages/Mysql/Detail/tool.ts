/*
 * @Author: kuangdan 
 * @Date: 2019-12-17 16:53:30 
 * @Last Modified: 2019-12-17 16:53:30 
 */ 

//  转detail接口的数据结构为数据

export const transDataToArray = data => {
    return Object.keys(data).reduce((prev, cur, idx) => {
        const configItem = {};
        switch (cur) {
            case "name":
                configItem['name'] = '名称';
                break;
            case "tenantName":
                configItem['name'] = '租户';
                break;
            case "type":
                configItem['name'] = '类型';
                break;
            case "rootPassword":
                configItem["name"] = "密码";
                break;
            // case "connection":
            //     configItem["name"] = "连接信息"
            //     break;
            case "instances":
                configItem["name"] = "实例列表";
                break;
            case "dbConfiguration":
                configItem["name"] = "默认配置"
                break;
            case "userName":
                configItem["name"] = "操作人"
                break;
            default:
                break;
        }
        prev.push(configItem);
        configItem['enName'] = cur;
        configItem['value'] = data[cur];
        return prev
    }, Array())
}