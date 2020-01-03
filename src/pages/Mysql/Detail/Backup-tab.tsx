/*
 * @Author: kuangdan
 * @Date: 2019-12-16 14:53:32
 * @Last Modified: 2019-12-16 14:53:32
 */

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { Table, Card, Switch, Icon, InputNumber, message } from "antd";
import { FormatTime } from "@utils/tools";

import { YhText } from "@styled/Text";

import { saveBackupuStrategy, saveBackupDays } from "./service";

export default function(props) {
	const {
		backList,
		basicData: { backupStrategy, backupKeepDays },
		match: {
			params: { id }
		}
	} = props;

	const [tableList, settableList] = useState(Array());
	const [isBackupstrategyEditing, setisBackupstrategyEditing] = useState(
		false
	);
	const [isBackcupDaysEditing, setisBackcupDaysEditing] = useState(false);

	const [hour, sethour] = useState(0);
	const [minute, setminute] = useState(0);
	const [days, setdays] = useState(0);
	const [isStrategyRunning, setisStrategyRunning] = useState(true);
	const [isDaysRunning, setisDaysRunning] = useState(true);

	useEffect(() => {
		if (Array.isArray(backList)) {
			settableList(backList);
		}
		backupStrategy
			.replace(/\*/g, "")
			.split(" ")
			.filter(i => i)
			.forEach((item, idx) => {
				idx === 0 ? setminute(item) : sethour(item);
			});
		setdays(backupKeepDays);
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
				<Switch
					checked={idx === 1 ? isStrategyRunning : isDaysRunning}
				/>
				<span className="start">{`启`}</span>
			</>
		);
	};

	/**
	 * 编辑备份信息
	 * @param type
	 */
	const editContent = type => {
		if (type === "strategy") {
			setisBackupstrategyEditing(!isBackupstrategyEditing);
		} else {
			setisBackcupDaysEditing(!isBackcupDaysEditing);
		}
	};

	/**
	 * 操作面板
	 * @param status
	 * @param type
	 */
	const actionChange = (status, type) =>
		!status
			? [
					<Icon
						type="edit"
						theme="twoTone"
						onClick={() => editContent(type)}
					/>
			  ]
			: [
					<Icon
						type="close-square"
						theme="twoTone"
						onClick={() => editContent(type)}
					/>,
					<Icon
						type="check-square"
						theme="twoTone"
						onClick={() => save(type)}
					/>
			  ];

	/**
	 * onchange备份时间
	 * @param val
	 */
	const setBackupDays = val => {
		setdays(val);
	};

	/**
	 * onchange备份策略
	 * @param type
	 */
	const setBackupTime = (type, val) => {
		if (type === "hour") {
			sethour(val);
		} else {
			setminute(val);
		}
	};

	/**
	 * 保存修改
	 * @param type 
	 */
	const save = type => {
		if (type === "strategy") {
			saveBackupuStrategy(id, `${minute} ${hour} * * *`)
				.then(res => {
					if (res === "ok") {
						message.success("备份策略修改成功");
						editContent(type);
					}
				})
				.catch(e => message.error(e.message));
		} else {
			saveBackupDays(id, days)
				.then(res => {
					if (res === "ok") {
						message.success("备份时间修改成功");
						editContent(type);
					}
				})
				.catch(e => message.error(e.message));
		}
	};

	return (
		<>
			<div style={{ display: "flex", marginBottom: "30px" }}>
				<Card
					title={"备份清理策略"}
					extra={switchBtn(2)}
					actions={actionChange(isBackupstrategyEditing, "strategy")}
				>
					{
						<>
							<YhText
								type="default"
								width="100px"
								style={{
									display: isBackupstrategyEditing
										? "none"
										: "block"
								}}
							>
								{`${minute} ${hour} * * *`}
							</YhText>
							<div
								style={{
									display: isBackupstrategyEditing
										? "block"
										: "none"
								}}
							>
								<InputNumber
									value={hour}
									min={0}
									max={6}
									formatter={value => `${value}时`}
									onChange={val => setBackupTime("hour", val)}
								/>
								<InputNumber
									value={minute}
									min={0}
									max={59}
									formatter={value => `${value}分`}
									onChange={val =>
										setBackupTime("minute", val)
									}
								/>
							</div>
						</>
					}
				</Card>
				<Card
					title={"备份时间"}
					extra={switchBtn(1)}
					actions={actionChange(isBackcupDaysEditing, "days")}
				>
					{
						<>
							<YhText
								type="default"
								style={{
									display: isBackcupDaysEditing
										? "none"
										: "block"
								}}
							>
								{days}天
							</YhText>
							<InputNumber
								value={days}
								min={-1}
								formatter={value => `${value}天`}
								onChange={val => setBackupDays(val)}
								style={{
									display: isBackcupDaysEditing
										? "block"
										: "none"
								}}
							/>
						</>
					}
				</Card>
			</div>

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
