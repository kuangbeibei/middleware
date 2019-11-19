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

import { YhText } from "@styled/Text";
import { YhTerminal } from "@styled/Terminal";

function LogMoal(props) {
	const { tableModalVisibility, setTableModalVisibility, loginfo } = props;

	useEffect(() => {
		setTableModalVisibility();
	}, []);

	/**
	 * 颜色处理output
	 * @param output
	 */
	const processLog = () => {
		let _output;
		if (loginfo) {
			_output = loginfo.split(/\n/g);
			let resOutput = _output.reduce((prev, cur) => {
				return (
					<>
						{prev}
						<YhText
							type={
								cur.startsWith("ok")
									? "success"
									: cur.startsWith("changed")
									? "warning"
									: cur.startsWith("warning")
									? "warning"
									: ""
							}
						>
							{cur}
						</YhText>
						<br />
					</>
				);
			}, "");
			return <>{resOutput}</>;
		} else {
			return null;
		}
	};

	const handleCancel = () => {
		setTableModalVisibility();
	};

	return (
		<Modal
			modalName={`Redis部署日志`}
			visible={tableModalVisibility.visible}
			handleOk={() => {}}
			handleCancel={handleCancel}
			width={1200}
		>
			<YhTerminal width={1200}>
				<div>
					<pre>{processLog()}</pre>
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
