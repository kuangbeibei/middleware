/*
 * mysql 拓扑图
 * @Date: 2019-12-30 17:55:07
 * @Last Modified: 2019-12-30 17:55:07
 */
import * as React from "react";
import {
    useState,
    useEffect
} from "react";
import Modal from "@com/Modal";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";

function MysqlTopologyModal(props) {
    const {
        data,
        tableModalVisibility,
		setTableModalVisibility,
    } = props;

    useEffect(() => {
		setTableModalVisibility()
	}, [])

    const handleClose = () => {
		setTableModalVisibility()
	}

	return (
		<Modal
            modalName={`Mysql集群拓扑`}
            visible={tableModalVisibility.visible}
			width="1400px"
			handleOk={() => {}}
			handleCancel={handleClose}
		>
            {
                `我是拓扑腿`
            }
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
)(MysqlTopologyModal);
