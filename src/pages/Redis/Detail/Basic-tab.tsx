/*
 * @Author: kuangdan
 * @Date: 2019-11-27 11:06:31
 * @Last Modified: 2019-11-27 11:06:31
 */

import * as React from "react";
import { Descriptions } from "antd";
import PasswordColumn from "@com/Password-unit";

export default function(props) {
	const { basicData } = props;

	const processInstancesData = val => {
		return val.reduce(
			(prev, cur, idx) => `${prev}${cur.ip}:${cur.port}\n`,
			""
		);
	};

	/**
	 * 处理密码展示
	 * @param pass
	 */
	const processPass = pass => {
		return <PasswordColumn pass={pass} />;
	};

	return (
		<Descriptions bordered column={1}>
			{basicData &&
				Array.isArray(basicData) &&
				basicData.map(configItem => {
					let val;
					if (typeof configItem.value === "string") {
						val = configItem.value.replace(/\n/g, "\n");
					}
					if (Array.isArray(configItem.value)) {
						val = processInstancesData(configItem.value);
					}
					return (
						<Descriptions.Item
							key={configItem.enName}
							label={configItem.name}
						>
							{configItem.enName === "moreConf" ||
							configItem.enName === "instances" ||
							configItem.enName === "defaultConf" ? (
								<pre>{val}</pre>
								) : configItem.enName === 'redisPass' ? processPass(configItem.value) : (
								<span>{configItem.value || "无"}</span>
							)}
						</Descriptions.Item>
					);
				})}
		</Descriptions>
	);
}
