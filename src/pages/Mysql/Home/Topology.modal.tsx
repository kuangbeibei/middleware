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

import "./style.less"

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
            <div className="flexdiv">
                <div className="client">Client</div>
                <div className="load-balance">Load Balance</div>
                <div className="routers">
                    Mysql Router
                    <div className="mysql-router">
                        <div className="router-ip">IP: 172.29.1.101</div>
                        <div className="write-port">W: 6446</div>
                        <div className="read-port">R: 6447</div>
                    </div>
                    <div className="mysql-router">
                        <div className="router-ip">IP: 172.29.1.102</div>
                        <div className="write-port">W: 6446</div>
                        <div className="read-port">R: 6447</div>
                    </div>
                </div>
                <div className="instances">
                    Instances
                    <div className="instance">
                        <div className="ip-port">172.29.1.101:3306</div>
                        <div className="role">M</div>
                    </div>
                    <div className="instance">
                        <div className="ip-port">172.29.1.102:3306</div>
                        <div className="role">S</div>
                    </div>
                    <div className="instance">
                        <div className="ip-port">172.29.1.103:3306</div>
                        <div className="role">S</div>
                    </div>
                </div>
            </div>
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
