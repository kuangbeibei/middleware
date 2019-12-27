/*
 * @Author: kuangdan
 * @Date: 2019-12-03 19:00:40
 * @Last Modified: 2019-12-03 19:00:40
 */

import * as React from "react";
import { useState } from "react";
import {
	Row,
	Col,
	Icon,
	Menu,
	Dropdown,
	Button,
	Radio,
	TimePicker,
	DatePicker
} from "antd";
import { YhOp } from "@styled/Button";
import ControlledDatePicker from "@com/Date-Time.picker";
import Iframe from "react-iframe";
import { useIntervalWithCondition } from "@hooks/use-interval";
import { IData, refreshItems, dateRanges } from "./data";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MonitorTime from "@actions/Monitor/time";

function CommonMoitor(props) {
	const {
		history: {
			location: {
				state: {
					query: { ip, port, clusterId, clusterName }
				}
			}
		},
		data,
		type,
		monitorTime: { start, end },
		dispatchMonitorTime: { setStartDate, setEndDate }
	} = props;

	const nowTime = new Date().getTime();

	const [height, setheight] = useState(938);
	const [fromTime, setfromTime] = useState(nowTime - 1000 * 60 * 60 * 24);
	const [toTime, settoTime] = useState(nowTime);
	const [refresh, setrefresh] = useState(30);
	const [visibility, setvisibility] = useState("none");

	useIntervalWithCondition(
		() => {
			setheight(window.innerHeight / 4 - 54);
		},
		[window.innerHeight],
		2000
	);

	function renderIframes(nodeMonitorArrayData) {
		return nodeMonitorArrayData.map((ds: IData[], idx) => {
			return <Row key={idx}>{ds.map((d: IData) => iframedom(d))}</Row>;
		});
	}

	const iframedom = d => {
		return (
			<Col span={d.col} key={d.panelId}>
				<div className="iframe-item" style={{ height: `${height}px` }}>
					{type === "cluster" ? (
						<Iframe
							url={`${d.url}&refresh=${refresh}s&from=${start ||
								fromTime}&to=${end ||
								toTime}&var-cluster=fzzj_redis_${clusterName}_${clusterId}&theme=light&panelId=${
								d.panelId
							}`}
						/>
					) : (
						<Iframe
							url={`${d.url}&refresh=${refresh}s&from=${start ||
								fromTime}&to=${end ||
								toTime}&var-cluster=fzzj_redis_${clusterName}_${clusterId}&var-${type === 'node' ? 'node' : 'instance'}=${ip}:${
								type === "machine" ? "9100" : port
							}&theme=light&panelId=${d.panelId}`}
						/>
					)}
				</div>
			</Col>
		);
	};

	const changeRefresh = item => {
		setrefresh(item.key);
	};

	const refreshMenu = (
		<Menu>
			{refreshItems.map(item => (
				<Menu.Item key={item} onClick={changeRefresh}>
					{`${item}s`}
				</Menu.Item>
			))}
		</Menu>
	);

	const changeRange = e => {
		const endTime = new Date().getTime();
		settoTime(endTime);
		const val = e.target.value;
		setvisibility("none");
		switch (val) {
			case "realtime":
				setfromTime(endTime - 1000 * 60 * 30);
				break;
			case "24hours":
				setfromTime(endTime - 1000 * 60 * 60 * 24);
				break;
			case "7days":
				setfromTime(endTime - 1000 * 60 * 60 * 24 * 7);
				break;
			default:
				setvisibility("block");
				break;
		}
	};

	return (
		<>
			<div style={{ marginBottom: "10px" }}>
				<Radio.Group onChange={changeRange} defaultValue="24hours">
					{dateRanges.map(range => (
						<Radio.Button value={range.key} key={range.key}>
							{range.name}{" "}
							{range.key === "pickdate" ? (
								<Icon type="calendar" />
							) : (
								""
							)}
						</Radio.Button>
					))}
				</Radio.Group>
				<div style={{ marginLeft: "10px", display: "inline-block" }}>
					<Dropdown overlay={refreshMenu}>
						<Button>
							<Icon type="sync" />{" "}
							<YhOp
								color={`#eb7b18`}
								fontWeight={`800`}
							>{`${refresh}s`}</YhOp>{" "}
							<Icon type="down" />
						</Button>
					</Dropdown>
				</div>
			</div>

			<ControlledDatePicker visibility={visibility} />

			{renderIframes(data)}
		</>
	);
}
export default connect(
	(state: any) => ({
		monitorTime: state.monitorTime
	}),
	dispatch => ({
		dispatchMonitorTime: bindActionCreators(MonitorTime, dispatch)
	})
)(CommonMoitor);
