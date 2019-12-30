/*
 * @Author: kuangdan
 * @Date: 2019-12-16 14:53:32
 * @Last Modified: 2019-12-16 14:53:32
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { Table, Card, Switch, Icon, InputNumber } from "antd";

import "./style.less";

export default function(props) {
	const { backupStrategy, backupKeepDays } = props;

	const columns = [
		{
			title: "开始时间",
			key: "start",
			render: text => text
		},
		{
			title: "结束时间",
			key: "end ",
			render: text => text
		},
		{
			title: "备份位置",
			key: "position",
			render: text => text
		},
		{
			title: "元数据",
			key: "meta",
			render: text => text
		}
	];

	const switchBtn = idx => {
		return (
			<>
				<span className="stop">{`停`}</span>
				<Switch />
				<span className="start">{`启`}</span>
			</>
		);
	};

	const actionChange = status =>
		status === "init"
			? [<Icon type="edit" theme="twoTone" />]
			: [
					<Icon type="close-square" theme="twoTone" />,
					<Icon type="check-square" theme="twoTone" />
			  ];

	return (
		<>
			<Card
				title={"备份清理策略"}
				extra={switchBtn(2)}
				actions={actionChange("init")}
			>
				{
					<>
						<InputNumber
							// defaultValue={hour}
							min={0}
							max={6}
							formatter={value => `${value}时`}
							// onChange={val => setBackupTime("hour", val)}
						/>
						<InputNumber
							// defaultValue={minute}
							min={0}
							max={59}
							formatter={value => `${value}分`}
							// onChange={val => setBackupTime("minute", val)}
						/>
					</>
				}
			</Card>
			<Card
				title={"备份时间"}
				extra={switchBtn(1)}
				actions={actionChange("init")}
			>
				{<InputNumber min={-1} formatter={value => `${value}天`} />}
			</Card>

			<h4>备份历史列表:</h4>
			<Table columns={columns} dataSource={[]} size="small" />
		</>
	);
}
