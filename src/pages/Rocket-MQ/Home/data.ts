/*
 * @Author: your name
 * @Date: 2019-12-16 09:41:25
 * @LastEditTime: 2019-12-16 14:37:29
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /middleware-frontend/src/pages/Rocket-MQ/Home/data.ts
 */
export const rmqTypes = ["rmqNameServer", "rmqBroker", "rmqConsole"];

interface IrmqDataPrototype {
    id: string,
    businessName: string,
    componentType: string,
    createTime: string
}

export const rmqDataPrototype:IrmqDataPrototype = {
    id: '',
    businessName: '',
    componentType: '',
    createTime: '',
}
