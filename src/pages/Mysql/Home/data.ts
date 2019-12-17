/*
 * @Author: kuangdan 
 * @Date: 2019-12-16 17:47:03 
 * @Last Modified: 2019-12-16 17:47:03 
 */

// {
//         "name": "yh-mysql-ha",
//         "description": "永辉 mysql 集群, 基于 HA 部署的两节点集群",
//         "type": "ha",
//         "rootPassword": "Mysql,123",
//         "backupStrategy": "1 6 * * * *",
//         "backupServer": "172.29.1.1:/",
//         "backupKeepDays": 30,
//         "dbConfiguration": {
//             "mysql_server_repo": "http://172.29.1.1",
//             "mysql_data_dir": "/var/lib/mysql",
//             "mysql_listen_port": 3306,
//             "mysql_innodb_buffer_pool_size": "256M",
//             "mysql_max_connections": 4096,
//             "mysql_max_heap_table_size": "16M"
//         },
//         "hosts": {
//             "mw-mysql-1": {
//                 "role": "M",
//                 "ip": "172.29.1.101",
//                 "port": "3306",
//                 "user": "root",
//                 "password": ""
//             },
//             "mw-mysql-2": {
//                 "role": "S",
//                 "ip": "172.29.1.102",
//                 "port": "3306",
//                 "user": "root",
//                 "password": ""
//             }
//         },
//         "tenantId": "f8298dee-ed10-4caf-8392-879e41b02a3e"
//     }

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