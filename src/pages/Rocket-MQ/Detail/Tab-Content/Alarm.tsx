import * as React from 'react';
import { Component } from 'react';
import {  Table } from "antd";

function Alarm (props) {



	const columns = [
		{
			title: "告警名称",
			key: "name",
			render: text => (
				<a onClick={() => { console.log('去特定的告警页面') }}>{text.name}</a>
			)
		}
	];
  
  const tablelist = [
    {name: '__fzzj_redis_redis_exporter_builtin_alarm_policy_high'},
    {name: '__fzzj_redis_redis_exporter_builtin_alarm_policy_low'},
    {name: '__fzzj_redis_redis_exporter_builtin_alarm_policy_mid'}
  ]

	return (
		<Table
			columns={columns}
			dataSource={tablelist}
			bordered
			title={() => "基本告警"}
			rowKey="name"
		/>
	);
}

export default Alarm;