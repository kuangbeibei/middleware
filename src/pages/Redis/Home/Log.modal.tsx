/*
 * @Author: kuangdan
 * @Date: 2019-11-18 14:20:01
 * @Last Modified: 2019-11-18 14:20:01
 */

import * as React from "react";
import { useState, useEffect } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";

import Modal from "@com/Modal";

import { YhTerminal } from "@styled/Terminal";
import { processLog } from "@com/Log-modal/Log-process";

function LogMoal(props) {
	const { tableModalVisibility, setTableModalVisibility, loginfo } = props;

	useEffect(() => {
		setTableModalVisibility();
	}, []);

	const handleCancel = () => {
		setTableModalVisibility();
	};

	return (
		<Modal
			modalName={`Redis部署日志`}
			visible={tableModalVisibility.visible}
			handleOk={handleCancel}
			handleCancel={handleCancel}
			width={1200}
		>
			<YhTerminal width={1200}>
				<div>
					<pre>{processLog(loginfo)}</pre>
				</div>
			</YhTerminal>
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
)(LogMoal);
