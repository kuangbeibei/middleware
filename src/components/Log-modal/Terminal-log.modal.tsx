/*
 * 弹窗展示多个历史部署日志
 * @Date: 2020-01-03 14:50:50
 * @Last Modified: 2020-01-03 14:50:50
 */

import * as React from "react";

import { Tabs } from "antd";

import { useEffect } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";

import Modal from "@com/Modal";

import { YhTerminal } from "@styled/Terminal";
import { FormatTime } from "@utils/tools";
import { processLog } from "@com/Log-modal/Log-process";

function LogsModal(props) {
	const { tableModalVisibility, setTableModalVisibility, logs } = props;

	useEffect(() => {
		setTableModalVisibility();
	}, []);

	const handleCancel = () => {
		setTableModalVisibility();
	};

	return (
		<Modal
			modalName={`集群部署日志`}
			visible={tableModalVisibility.visible}
			handleOk={handleCancel}
			handleCancel={handleCancel}
			width={1200}
		>
			<Tabs
				defaultActiveKey="0"
				tabPosition={"left"}
				style={{ height: 520 }}
			>
				{Array.isArray(logs) &&
					logs.map((log, i) => (
						<Tabs.TabPane
							tab={`${FormatTime(log.ctime)}`}
							key={`${i}`}
						>
							<YhTerminal width={1200}>
								<div>
									<pre>{processLog(log.msg)}</pre>
								</div>
							</YhTerminal>
						</Tabs.TabPane>
					))}
			</Tabs>
		</Modal>
	);
}

export default connect(
	(state: any) => ({
		tableModalVisibility: state.tableModalVisibility
	}),
	dispatch => ({
		setTableModalVisibility: bindActionCreators(
			setTableModalVisibility,
			dispatch
		)
	})
)(LogsModal);
