/*
 * @Author: kuangdan 
 * @Date: 2019-12-03 14:16:50 
 * @Last Modified: 2019-12-03 14:16:50 
 */ 

import * as React from "react"
import {
    useState,
    useEffect
} from "react";
import { Row, Col } from "antd";
import Iframe from "react-iframe";

import { useIntervalWithCondition } from "@hooks/use-interval";

import { machineMonitorArrayData, IData } from "./data";

export default function (props) {
    const {
		history: {
			location: {
				state: {
					query: {
						ip,
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

    function renderIframes(machineMonitorArrayData) {
		return machineMonitorArrayData.map((ds: IData[], idx) => {
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
					<Iframe
						url={`${d.url}&refresh=30s&from=1574835182181&to=1574921582181&var-cluster=fzzj_redis_${clusterName}_${clusterId}&var-instance=${ip}:9100&theme=light&panelId=${d.panelId}`}
					/>
				</div>
			</Col>
		);
	};
    
   return (
		<>
			{renderIframes(machineMonitorArrayData)}
		</>
	);
}