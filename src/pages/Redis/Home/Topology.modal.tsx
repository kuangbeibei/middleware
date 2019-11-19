/*
 * Redis拓扑图
 * @Author: kuangdan 
 * @Date: 2019-11-18 14:20:31 
 * @Last Modified: 2019-11-18 14:20:31 
 */ 

import * as React from "react"
 
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";


import Modal from "@com/Modal";

import {
    YHSVG
} from "@styled/svg"

function TopologyModal(props) {
    const {
        tableModalVisibility,
        data: {
            nodes
        }
    } = props;

    console.log('props222222, ', props);

    /**
	 * 集群关系 拓扑图；简单关联，目前用svg画的
	 * @param instances 
	 */
	const drawInstancesToShowMapRelations = () => {
		if (nodes && nodes.length > 0) {
			// 画布 宽800  间距 50 (2) 机器 200 * 60 (3)
			// master坐标 300 50 100 60, 450 50 100 60, 600 50 100 60  indianred
			// slave坐标 300 300 100 60, 450 300 100 60, 600 300 100 60  steelblue
			return nodes.map((instance, idx) => {
				const {
					replicas
				} = instance;
				return (
					<>
						<rect x={idx * 350 + 180} y="50" width="330" height="80" fill="indianred" />
						<text x={idx * 350 + 190} y="75" font-size="12" text-anchor="left" fill="white">{`id: ${instance.id}`}</text>
						<text x={idx * 350 + 190} y="95" font-size="12" text-anchor="left" fill="white">{`address: ${instance.address}`}</text>
						<text x={idx * 350 + 190} y="115" font-size="12" text-anchor="left" fill="white">{`slot: ${instance.slot}`}</text>
						<line x1={idx * 350 + 345} x2={idx * 350 + 345} y1="140" y2="270" stroke="orange" fill="transparent" stroke-width="5" stroke-linecap="round"/>
						<rect x= {idx * 350 + 180} y="280" width="330" height="70" fill="steelblue" />
						<text x={idx * 350 + 190} y="305" font-size="12" text-anchor="left" fill="white">{`id: ${replicas[0].id}`}</text>
						<text x={idx * 350 + 190} y="325" font-size="12" text-anchor="left" fill="white">{`address: ${replicas[0].address}`}</text>

						{
							idx === nodes.length -1 ? (
								<>
									<text x="0" y="80" font-size="20" text-anchor="left" fill="indianred">Masters</text>
									<rect x="100" y="30" width="1250" height="130" fill="transparent" stroke-width="3" stroke="#999"/>
									<text x="0" y="335" font-size="20" text-anchor="left" fill="steelblue">Slaves</text>
									<rect x="100" y="250" width="1250" height="130" fill="transparent" stroke-width="3" stroke="#999"/>
								</>
							) : ''
						}
					</>
				)
			})
		} 
	}


    return <Modal
			modalName={`Redis集群拓扑`}
			visible={tableModalVisibility.visible}
			handleOk={() => {}}
			handleCancel={() => {}}
    >
        <YHSVG
					version="1.1"
					baseProfile="full"
					xmlns="http://www.w3.org/2000/svg"
				>
					
					{
						drawInstancesToShowMapRelations()
					}
				</YHSVG>
        </Modal>
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
