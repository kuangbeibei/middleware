/*
 * @Author: kuangdan
 * @Date: 2019-11-01 10:32:26
 * @Last Modified: 2019-11-01 10:32:26
 */

import * as React from "react";
import { useState, useEffect } from "react";

import { connect } from "react-redux";


import TableAddBtn from "@com/Table-list-add";
import Tablelist from "@com/Table-list";
import Message from "@com/Message-bar"

import { FormatTime } from "@tools";
import { get, post, del, put } from "@api";

import * as rmqtype from "./data.json";



function RocketMQ(props) {
	const { visible } = props;
	const [rows, setRmqList] = useState(Array());
	const [message, setMessage] = useState({});

	useEffect(() => {
		get(`/mid/v1/rmq/getRmqComponentClusterRecords/1/10`).then(res => {
			setRmqList(
				res.data && res.data.data && res.data.data.rmqComponents
			);
		});
	}, []);


	interface Column {
		id:
			| "id"
			| "businessName"
			| "componentType"
			| "createTime"
			| "operation";
		label: string;
		minWidth?: number;
		align?: string;
		format?: (value: string) => string;
		render?: any;
	}

	const columns: Column[] = [
		{
			id: "id",
			label: "ID",
			minWidth: 100
		},
		{
			id: "businessName",
			label: "名称",
			minWidth: 170
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
			render: row => {
				return (<div></div>
					// <IconButton
					// 	aria-label="delete"
					// 	onClick={() => deleteRmqWithId(row)}
					// >
					// 	<DeleteIcon fontSize="small" />
					// </IconButton>
				);
			}
		}
	];

	/**
	 * 删除一个rmq组件记录
	 * @param id
	 */
	const deleteRmqWithId = row => {
		del(`/mid/v1/rmq/deleteRmqComponentClusterRecord/${row.id}`)
			.then(res => {
				setMessage({
					type: "success",
					message: `删除${row.businessName}成功`
				});
			})
			.catch(e =>
				setMessage({
					type: "error",
					message: e.message || `删除${row.businessName}失败`
				})
			);
	};

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		// setAge(event.target.value as string);
	};

	const handleSubmit = () => {
		
	}

	return (
		<>
			<TableAddBtn />

			<Tablelist rows={rows} columns={columns} />

			<Message {...message} />

		</>
	);
}

export default connect((state: any) => ({
	visible: state.tableModalVisibility.visible
}))(RocketMQ);
