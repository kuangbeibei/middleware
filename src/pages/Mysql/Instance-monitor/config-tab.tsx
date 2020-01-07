/*
 * 主机配置 & DB配置 
 * @Date: 2020-01-03 17:52:10 
 * @Last Modified: 2020-01-03 17:52:10 
 */

import * as React from "react";
import {
    Divider,
} from "antd";

import "./style.less"

export default function (props) {
    const {
        host: {
            ip,
            tz,
            os,
            cpu,
            mem,
            sysDisk,
            dataDisk
        },
        db: {
            data
        }
    } = props;

    return <>
        <h4>主机信息</h4>
        <div className="content">
            <p>IP: {ip}</p>
            <p>Timezone: {tz}</p>
        </div>

        <Divider />
        <h4>机器配置</h4>
        <div className="content"> 
            <p>操作系统: {os}</p>
            <p>CPU: {cpu}</p>
            <p>内存: {mem}</p>
            <p>系统盘: {sysDisk}</p>
            <p>数据盘: {dataDisk}</p>
        </div>

        <Divider />
        <h4>DB配置</h4>
        <div className="content" style={{marginBottom: '30px'}}>
            <pre>{data}</pre>
        </div>
    </>
}
