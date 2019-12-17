/*
 * @Author: kuangdan 
 * @Date: 2019-12-16 14:52:00 
 * @Last Modified: 2019-12-16 14:52:00 
 */ 

import * as React from "react";
import { Descriptions } from "antd";

import {
	transDataToArray
} from "./tool"

export default function(props) {
	const { basicData } = props;

	let _basicData = transDataToArray(basicData);

	console.log('_basicData,', _basicData)

	return (
		<Descriptions bordered column={1}>
			{_basicData.map(configItem => {
				let val;

				if (configItem.enName === "dbConfiguration" || configItem.enName === "hosts") {
					val = JSON.stringify(configItem.value).replace(/[\{\}\"]/g, "").replace(/\,/g, "\n")
				} else {
					val = configItem.value;
				}
				return (
						configItem.name ? 
						<Descriptions.Item
							key={configItem.enName}
							label={configItem.name}
						>
							{
								<span>{val || "无"}</span>
							}
						</Descriptions.Item> : null
					) 
				})}
		</Descriptions>
	);
}
