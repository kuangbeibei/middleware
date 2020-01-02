/*
 * @Author: kuangdan
 * @Date: 2019-12-16 14:54:34
 * @Last Modified: 2019-12-16 14:54:34
 */

import * as React from "react";
import { useState, useEffect } from "react";

import { Timeline } from "antd";

import { FormatTime } from "@utils/tools";

export default function (props) {
	const {
		logs
	} = props;

	return (
		<Timeline style={{marginTop: '10px'}}>
			{
				logs.map(log => <Timeline.Item key={log.id} color={log.err ? 'red' : 'green'}>
					<p>{log.userName}</p>
					<p>{FormatTime(log.ctime)}</p>
					<p>{log.operator}</p>
					{
						log.error ? <p>{log.error}</p> : ''
					}
				</Timeline.Item>)
			}
		</Timeline>
	);
}
