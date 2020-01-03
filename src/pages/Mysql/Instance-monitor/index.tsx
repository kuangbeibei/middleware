/*
 * Mysql实例监控首页 
 * @Date: 2020-01-03 17:40:13 
 * @Last Modified: 2020-01-03 17:40:13 
 */ 
import * as React from "react";
import { useState, useEffect } from "react";
import { Tabs, message } from "antd";

const { TabPane } = Tabs;

export default function (props) {
	const {
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
	} = props;

	
    return <Tabs type="card">
			<TabPane tab="实例配置" key="1">
				1
			</TabPane>
			<TabPane tab="节点监控" key="2">
				2
			</TabPane>
			<TabPane tab="机器监控" key="3">
				3
			</TabPane>
		</Tabs>
}