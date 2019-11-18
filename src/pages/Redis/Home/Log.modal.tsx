/*
 * @Author: kuangdan 
 * @Date: 2019-11-18 14:20:01 
 * @Last Modified: 2019-11-18 14:20:01 
 */ 

import * as React from "react"
import Modal from "@com/Modal";

export default function (props) {
    return <Modal
			modalName={`Redis部署日志`}
			visible={false}
			handleOk={() => {}}
			handleCancel={() => {}}
    >
        部署日志
        </Modal>
}