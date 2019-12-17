/*
 * @Author: kuangdan 
 * @Date: 2019-12-16 17:47:03 
 * @Last Modified: 2019-12-16 17:47:03 
 */

interface Ihosts {
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
    hosts: Array<Ihosts>;
}