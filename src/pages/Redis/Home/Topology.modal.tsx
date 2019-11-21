/*
 * Redis拓扑图
 * @Author: kuangdan
 * @Date: 2019-11-18 14:20:31
 * @Last Modified: 2019-11-18 14:20:31
 */

import * as React from "react";
import { useState, useEffect } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";

import Modal from "@com/Modal";
import { isEven } from "@tools";
import {
	TopoImages
} from "./data"


function TopologyModal(props) {
	const {
		tableModalVisibility,
		setTableModalVisibility,
		nodes
	} = props;

	useEffect(() => {
		setTableModalVisibility()
	}, [])

	const handleClose = () => {
		setTableModalVisibility()
	}
	/**
	 * 集群关系 拓扑图；简单关联，目前用svg画的
	 * @param instances
	 */
	const drawInstancesToShowMapRelations = () => {
		if (nodes && nodes.length > 0) {
			// console.log('nodes,', nodes);
			// 画布 宽800  间距 50 (2) 机器 200 * 60 (3)
			// master坐标 300 50 100 60, 450 50 100 60, 600 50 100 60  indianred
			// slave坐标 300 300 100 60, 450 300 100 60, 600 300 100 60  steelblue
			return <>
				{
					nodes.map((instance, idx) => {
						const {
							replicas
						} = instance;
						const replica = replicas[0];
						return (
							<div className="topology" key={instance.id}>
								<div className="node master">
									<div className="instance-info">
										<div>{`address: ${instance.address}`}</div>
										<div>{`slot: ${instance.slot}`}</div>
										<div>{`id: ${instance.id}`}</div>
									</div>
								</div>
								<div className="node slave">
									<div className="replica-info">
										<div>{`address: ${replica.address}`}</div>
										<div>{`id: ${replica.id}`}</div>
									</div>
								</div> 
							</div>
						)
					})
				}
			</>
		}
	};

	return (
		<Modal
			modalName={`Redis集群拓扑`}
			width="1400px"
			visible={tableModalVisibility.visible}
			handleOk={() => {}}
			handleCancel={handleClose}
		>
			{
				drawInstancesToShowMapRelations()
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
)(TopologyModal);
