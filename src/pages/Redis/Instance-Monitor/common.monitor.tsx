/*
 * @Author: kuangdan
 * @Date: 2019-12-03 19:00:40
 * @Last Modified: 2019-12-03 19:00:40
 */

import * as React from "react";
import { useState } from "react"
import { Row, Col } from "antd";
import Iframe from "react-iframe";
import { useIntervalWithCondition } from "@hooks/use-interval";
import { IData } from "./data";

export default function (props, data, type) {
	const {
		history: {
			location: {
				state: {
					query: {
						ip,
						port,
						clusterId,
						clusterName
					}
				}
			}
		}
	} = props;
	const [height, setheight] = useState(938);
	useIntervalWithCondition(
		() => {
			setheight(window.innerHeight / 4 - 54);
		},
		[window.innerHeight],
		2000
	);


	function renderIframes(nodeMonitorArrayData) {
		return nodeMonitorArrayData.map((ds: IData[], idx) => {
			return <Row key={idx}>
				{
					ds.map((d:IData) => iframedom(d))
				}
			</Row>
			
		})
	}

	const iframedom = d => {
		return (
			<Col span={d.col} key={d.panelId}>
				<div className="iframe-item" style={{ height: `${height}px` }}>
					{
						type === 'cluster' ? <Iframe
						url={`${d.url}&refresh=30s&from=1574835182181&to=1574921582181&var-cluster=fzzj_redis_${clusterName}_${clusterId}&theme=light&panelId=${d.panelId}`}
					/> : <Iframe
						url={`${d.url}&refresh=30s&from=1574835182181&to=1574921582181&var-cluster=fzzj_redis_${clusterName}_${clusterId}&var-instance=${ip}:${type === 'machine' ? '9100' : port}&theme=light&panelId=${d.panelId}`}
					/>
					}
				</div>
			</Col>
		);
	};

	return (
		<>
			{renderIframes(data)}
		</>
	);
}
