/*
 * @Author: kuangdan
 * @Date: 2019-11-26 16:46:16
 * @Last Modified: 2019-11-26 16:46:16
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

import { getConfigDetail } from "../Home/service";

import BasicInfo from "./Basic-tab";
import MonitorInfo from "./Monitor-tab"
import AlarmBasic from "./Alarm-basic"
import AlarmCustom from "./Alarm-custom"
import Loading from "@com/UI/Loading";

import "./style.less";

export default function(props) {
	const {
		match: {
			params: { taskId }
		}
	} = props;


    const [basicData, setbasicData] = useState(Array());
    const [loading, setloading] = useState(true);

    useEffect(() => {
        changeTab("1")
    }, [])
    
    const changeTab = (key) => {
        setloading(true);
        switch (key) {
			case "1":
				if (basicData.length === 0) {
					getConfigDetail(taskId).then(data => {
						setbasicData(data);
						setloading(false);
					});
				} else {
					setloading(false);
				}
				break;
            case "2":
                setloading(false);
				break;
            default:
                setloading(false);
				break;
		}
    }

	return (
		<Tabs onChange={changeTab} type="card">
			<TabPane tab="集群基本信息" key="1">
				{
					loading ? <Loading /> : <BasicInfo basicData={basicData} {...props} />
				}
                
			</TabPane>
			<TabPane tab="监控" key="2">
				
				{
					loading ? <Loading /> : <MonitorInfo basicData={basicData} {...props} />
				}
                
			</TabPane>
			<TabPane tab="告警" key="3">
				{
					loading ? <Loading /> : <>
						<AlarmBasic {...props} />
                		{/* <AlarmCustom {...props} /> */}
					</>
				}
                
			</TabPane>
		</Tabs>
	);
}
