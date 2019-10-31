import * as React from "react";
import {useState, useEffect} from "react"
import TableAddBtn from "@com/Table-list-add";
import Tablelist from "@com/Table-list";
import {FormatTime} from "@tools"

import { get, post, del, put } from "@api"


// "id": 1,
// "businessName": "name server 测试1",
// "componentType": "rmqNameServer",
// "createTime": "2019-10-22T16:05:31+08:00",
// "version": 1

export default function (props) {
	const [rows, setRmqList] = useState(Array())

	useEffect(() => {
		get(`/mid/v1/rmq/getRmqComponentClusterRecords/1/10`).then(res => {
			console.log('res', res);
			setRmqList(res.data && res.data.data && res.data.data.rmqComponents)
		})
	}, [])
	interface Column {
		id: "id" | "businessName" | "componentType" | "createTime" | "operation";
		label: string;
		minWidth?: number;
		align?: string;
        format?: (value: string) => string;
        render?: any 
	}

	const columns: Column[] = [
		{
			id: "id",
			label: "ID",
			minWidth: 100,
		},
		{
			id: "businessName",
			label: "名称",
			minWidth: 170,
		},
		{
			id: "componentType",
			label: "RMQ类型",
			minWidth: 170,
			format: (value: string) => value.toLocaleString()
		},
		{
			id: "createTime",
			label: "创建时间",
			minWidth: 200,
			format: (value: string) => FormatTime(value)
		},
        {
            id: "operation",
            label: "操作",
            minWidth: 200,
            align: "center",
            render: (text: any, record: any, index: any) => {
                return <span>123</span>
            }
        }
    ];

	return (
		<>
			<TableAddBtn />
			<Tablelist rows={rows} columns={columns} />
		</>
	);
}
