/*
 * @Author: kuangdan
 * @Date: 2019-12-16 14:52:00
 * @Last Modified: 2019-12-16 14:52:00
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { Descriptions } from "antd";

import PasswordColumn from "@com/Password-unit";

import { transDataToArray } from "./tool";

export default function(props) {
	const { basicData } = props;
	let _basicData = transDataToArray(basicData);

	/**
	 * 处理实例
	 * @param val
	 */
	const processInstancesData = val =>
		val.reduce((prev, cur) => `${prev}${cur.ip}:${cur.port}\n`, "");

	/**
	 * 处理connection
	 * @param
	 */
	const processConnection = val =>
		val.reduce((prev, cur) => `${prev}${cur}\n`, "");

	/**
	 * 处理密码展示
	 * @param pass
	 */
	const processPass = pass => <PasswordColumn pass={pass} />;

	return (
		<Descriptions bordered column={1}>
			{_basicData.map(configItem => {
				let val;
				if (configItem.enName === "dbConfiguration") {
					val = JSON.stringify(configItem.value)
						.replace(/[\{\}\"]/g, "")
						.replace(/\,/g, "\n");
				} else if (typeof configItem.value === "string") {
					val = configItem.value.replace(/\n/g, "\n");
				} else if (configItem.enName === "instances") {
					val = processInstancesData(configItem.value);
				} else if (configItem.enName === "connection") {
					val = processConnection(configItem.value);
				} else {
					val = configItem.value;
				}

				return configItem.name ? (
					<Descriptions.Item
						key={configItem.enName}
						label={configItem.name}
					>
						{
							configItem.enName === "rootPassword" ? processPass(val) : <pre>{val || "无"}</pre>
						}
					</Descriptions.Item>
				) : null;
			})}
		</Descriptions>
	);
}
