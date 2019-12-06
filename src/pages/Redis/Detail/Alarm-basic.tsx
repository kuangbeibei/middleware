/*
 * @Author: kuangdan
 * @Date: 2019-11-27 16:33:48
 * @Last Modified: 2019-11-27 16:33:48
 */

import * as React from "react";
import { useState, useEffect } from "react";

import { Button, Table } from "antd";

import { getAlarmBasicList } from "./service";

export default function(props) {
	const [tablelist, settablelist] = useState(Array());

	useEffect(() => {
		getAlarmBasicList().then(data => {
			settablelist(data);
		});
	}, []);

	const columns = [
		{
			title: "告警名称",
			key: "name",
			render: text => (
				<a onClick={() => gotoAlarmDetail(text)}>{text.name}</a>
			)
		}
	];

	const gotoAlarmDetail = text => {
		location.href = `${location.origin}/monitor/alarm/strategyDetail/${text.id}?regionUrl=.api.fz.yonghui.cn`;
	};

	return (
		<Table
			columns={columns}
			dataSource={tablelist}
			bordered
			title={() => "基本告警"}
		/>
	);
}
