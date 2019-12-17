/*
 * @Author: kuangdan 
 * @Date: 2019-12-16 14:48:48 
 * @Last Modified: 2019-12-16 14:48:48 
 */ 

import * as React from "react"
 import { useState, useEffect } from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

import BasicInfo from "./Basic-tab";
import BackupTab from "./Backup-tab";
import ActionsLogTab from "./Action.logs-tab"
import Loading from "@com/UI/Loading";

export default function (props) {
    // const {
	// 	match: {
	// 		params: { taskId }
	// 	}
    // } = props;

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
					// getConfigDetail(taskId).then(data => {
					// 	setbasicData(data);
					// 	setloading(false);
					// });
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
    
    return <Tabs onChange={changeTab} type="card">
			<TabPane tab="集群基本信息" key="1">
				{
				// loading ? <Loading /> :
					<BasicInfo basicData={basicData} {...props} />
				}
                
			</TabPane>
			<TabPane tab="备份与恢复" key="2">
				
				{
				// loading ? <Loading /> :
					<BackupTab basicData={basicData} {...props} />
				}
                
			</TabPane>
			<TabPane tab="操作日志" key="3">
				{
					// loading ? <Loading /> : 
						<ActionsLogTab {...props} />
				}
                
			</TabPane>
		</Tabs>
}