/*
 * @Author: kuangdan
 * @Date: 2019-11-18 10:22:21
 * @Last Modified: 2019-11-18 10:22:21
 */

import * as React from "react";
import { useState, useEffect } from "react";

import { getClusterDetail } from "./service";

import { Table, message, Tooltip, Button } from "antd";

import Loading from "@com/UI/Loading";

import {
    isEven
} from "@tools"

export default function (props) {
    const {
        match: {
            params: { taskId }
        }
    } = props;

    let [loading, setloading] = useState(true);
    let [tableList, setTableList] = useState(Array());

    useEffect(() => {
        getClusterDetail(taskId)
            .then(data => {
                setloading(false);
                setTableList(data.instances);
            })
            .catch(e => { });
    }, []);

    const columns = [
        {
            title: "实例IP",
            dataIndex: "ip",
            key: "ip",
            render: text => text
        },
        {
            title: "实例port",
            dataIndex: "port",
            key: "port",
            render: text => text
        },
        {
            title: "角色",
            key: "role",
            render: (a, b, idx) => `${isEven(idx) ? idx/2 + 1 : Math.ceil(idx/2)} ` + ` - ${isEven(idx) ? 'Master' : 'Slave'}`
        },
        {
            title: "监控状态",
            dataIndex: "monitor",
            key: "monitor",
            render: text => <Tooltip placement="top" title={"监控状态"}>
                <Button
                    type="link"
                    icon="bar-chart"
                />
            </Tooltip>
        },
        {
            title: "用户名",
            dataIndex: "user",
            key: "user",
            render: text => text
        },
        {
            title: "密码",
            dataIndex: "pass",
            key: "pass",
            render: text => text
        }
    ];

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                    <Table columns={columns} dataSource={tableList} rowKey="ip" />
                )}
        </>
    );
}
