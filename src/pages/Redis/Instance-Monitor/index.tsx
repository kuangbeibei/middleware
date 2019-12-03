/*
 * @Author: kuangdan
 * @Date: 2019-11-28 14:00:11
 * @Last Modified: 2019-11-28 14:00:11
 */

import * as React from "react";
import {
	useState,
	useEffect
} from "react";

import {
	Tabs,
} from "antd"
import Loading from "@com/UI/Loading";
import NodeMonitor from "./Node.monitor";
import MachineMonitor from "./Machine.monitor"

import "./style.less"

export default function (props) {
	const [loading, setloading] = useState(true);

	useEffect(() => {
        changeTab("1")
    }, [])

	const changeTab = (key) => {
		setloading(true);
		if (key === "1") {
			setloading(false);
		} else {
			setloading(false);
		}
	}
	
	return (
		<div className="instance-monitor-iframes">
			<Tabs onChange={changeTab} type="card">
				<Tabs.TabPane tab="节点监控" key="1">
					{
						loading ? <Loading /> : <NodeMonitor {...props} />
					}
				</Tabs.TabPane>
				<Tabs.TabPane tab="机器监控" key="2">
					{
						loading ? <Loading /> : <MachineMonitor {...props} />
					}
				</Tabs.TabPane>
			</Tabs>
			
		</div>
	);
}
