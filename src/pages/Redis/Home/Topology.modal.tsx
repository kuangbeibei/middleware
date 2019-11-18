/*
 * Redis拓扑图
 * @Author: kuangdan 
 * @Date: 2019-11-18 14:20:31 
 * @Last Modified: 2019-11-18 14:20:31 
 */ 

 import * as React from "react"
import Modal from "@com/Modal";
import {
    YHSVG
} from "@styled/svg"

export default function (props) {
    return <Modal
			modalName={`Redis集群拓扑`}
			visible={false}
			handleOk={() => {}}
			handleCancel={() => {}}
    >
        集群拓扑
        </Modal>
}

 