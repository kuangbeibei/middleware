/*
 * @Author: kuangdan
 * @Date: 2019-12-16 14:53:32
 * @Last Modified: 2019-12-16 14:53:32
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { Table, Card, Switch, Icon, InputNumber } from "antd";
import { FormatTime } from "@utils/tools";

export default function(props) {
	const {
		backList,
		basicData: { backupStrategy, backupKeepDays }
	} = props;

	console.log(backList, backupStrategy, backupKeepDays);

	const [tableList, settableList] = useState(Array());
	const [isBackupstrategyEditing, setisBackupstrategyEditing] = useState(false);
	const [isBackcupDaysEditing, setisBackcupDaysEditing] = useState(false)

	useEffect(() => {
		if (Array.isArray(backList)) {
			settableList(backList);
		}
	}, []);

	const columns = [
		{
			title: "开始时间",
			dataIndex: "startTime",
			key: "startTime",
			render: text => FormatTime(text)
		},
		{
			title: "结束时间",
			dataIndex: "endTime",
			key: "endTime ",
			render: text => FormatTime(text)
		},
		{
			title: "备份位置",
			dataIndex: "path",
			key: "path",
			render: text => text
		},
		{
			title: "备份信息",
			dataIndex: "BinlogPos",
			key: "BinlogPos",
			render: text => <pre>{text.replace(/\,/g, "\n")}</pre>
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

	const editContent = type => {
		if (type === 'strategy') {

		} else {
			
		}
	}

	const actionChange = (status, type) =>
		status
			? [<Icon type="edit" theme="twoTone" onClick={() => editContent(type)} />]
			: [
					<Icon type="close-square" theme="twoTone" />,
					<Icon type="check-square" theme="twoTone" />
			  ];

	return (
		<>
			<Card
				title={"备份清理策略"}
				extra={switchBtn(2)}
				actions={actionChange("isBackupstrategyEditing", 'strategy')}
			>
				{
					<>
						<span style={{display: isBackupstrategyEditing ? 'none' : 'block'}}>{backupStrategy}</span>
						<div style={{display: isBackupstrategyEditing ? 'block' : 'none'}}>
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
						</div>
					</>
				}
			</Card>
			<Card
				title={"备份时间"}
				extra={switchBtn(1)}
				actions={actionChange("isBackcupDaysEditing", 'days')}
			>
				{
					<>
						<span style={{display: isBackcupDaysEditing ? 'none' : 'block'}}>{backupKeepDays}</span>
						<InputNumber min={-1} formatter={value => `${value}天`} style={{display: isBackcupDaysEditing ? 'block' : 'none'}}/>
					</>
				}
			</Card>

			<Table
				columns={columns}
				dataSource={tableList}
				size="small"
				rowKey="BinlogPos"
				title={() => `备份历史列表`}
				style={{ marginTop: "-10px" }}
			/>
		</>
	);
}
