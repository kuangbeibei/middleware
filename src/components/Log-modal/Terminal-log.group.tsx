/*
 * 多个log的modal
 * @Date: 2020-01-06 15:26:59
 * @Last Modified: 2020-01-06 15:26:59
 */

import * as React from "react";
import { useState, useEffect } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";

import Modal from "@com/Modal";

import { YhTerminal } from "@styled/Terminal";
import { FormatTime } from "@utils/tools";
import { processLogWithUI } from "@com/Log-modal/Log-process";

import { Icon } from "antd";

const LogGroup = props => {
	let { isUnFold, title } = props;
	// 默认不展开
	let [unFold, setUnfold] = useState(false);

	useEffect(() => {
		setUnfold(isUnFold);
	}, [isUnFold]);

	return (
		<>
			<div
				className="log-header"
				style={{ position: 'absolute', background: '#000'}}
				onClick={() => setUnfold(pre => !pre)}
			>
				<span className="fold-status-icon" style={{cursor: 'pointer'}}>
					{unFold ? (
						<Icon type="caret-down" />
					) : (
						<Icon type="caret-right" />
					)}
				</span>
				<span>{title}</span>
			</div>

			<div
				className="log-content-wrapper"
				style={{ display: unFold ? "block" : "none" }}
			>
				{props.children}
			</div>
		</>
	);
};

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
			<YhTerminal height={620} width={1200}>
				<div>
					{logs.map((logGroupItem, index) => (
						<LogGroup
							key={index}
							isUnFold={index == logs.length - 1}
							title={FormatTime(logGroupItem.createTime || logGroupItem.ctime)}
						>
							<div style={{marginTop: '20px'}}>
								{processLogWithUI(logGroupItem.output)}
							</div>
						</LogGroup>
					))}
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
)(LogsModal);
