/*
 * @Author: your name
 * @Date: 2019-12-16 09:41:25
 * @LastEditTime: 2019-12-16 14:37:29
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /middleware-frontend/src/pages/Rocket-MQ/Home/data.ts
 */
export const rmqTypes = ["rmqNameServer", "rmqBroker", "rmqConsole"];



interface IBrokerInstance {
  ip: string,
  port: number,
  user: string,
  pass: string,
}

interface IConsoleInstance {
  ip: string,
  port: number,
  user: string,
  pass: string,
}


interface INameServerInstance {
  ip: string,
  port: number,
  user: string,
  pass: string,
}

 export interface IrmqDataPrototype{
    // componentType: string,
    id?: string,
    businessName: string,
    tenantId: string,
    summary: string,
    version: string,
    nameServerMoreConf?: string,
    brokerMoreConf?:string,
    // nameServerInstances: Array<INameServerInstance>,
    // brokerInstances:  Array<IBrokerInstance>,
    // consoleInstances: Array<IConsoleInstance>,

    nameServerInstances: Array<any>,
    brokerInstances:  Array<any>,
    consoleInstances: Array<any>,

    createTime?: string,
}


// 添加rocketMQ集群详细信息
export const rmqDataPrototype:IrmqDataPrototype = {
    id: '',
    businessName: '',
    tenantId: '',
    summary: '',
    version: '',
    nameServerInstances: [],
    brokerInstances:  [],
    consoleInstances: [],
}


// 表格显示基础信息
interface rocketMQInfo {
  id: number,
  taskId: number,
  status: string,
  businessName: string,
  summary: string,
  tenantId: string,
  note: string,
  nameServerNum: number,
  brokerNum: number,
  createTime: string,
  updateTime: string,
  version: number,
  tenantName: string
}