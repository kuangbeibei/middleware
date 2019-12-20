/*
 * @Author: kuangdan 
 * @Date: 2019-12-16 17:47:03 
 * @Last Modified: 2019-12-16 17:47:03 
 */

interface Iinstances {
    ip: string;
    port: string | number;
    user: string;
    pass: string;
    role: string;
}

export interface IPostParams {
    name: string;
    tenantId?: string;
    description?: string;
    type: string;
    rootPassword: string;
    backupStrategy: string;
    backupServer: string;
    backupKeepDays: string;
    dbConfiguration?: any;
    instances: Array<Iinstances>;
}

// 自动备份策略 0-59(分钟)，0-4（小时），***，（空格）
// 清理策略，可以无，-1