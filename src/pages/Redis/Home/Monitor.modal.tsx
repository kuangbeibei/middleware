/*
 * @Author: kuangdan 
 * @Date: 2019-11-18 14:19:37 
 * @Last Modified: 2019-11-18 14:19:37 
 */ 

import * as React from "react"
import Modal from "@com/Modal";

export default function (props) {
    return <Modal
			modalName={`Redis监控状态`}
			visible={false}
			handleOk={() => {}}
			handleCancel={() => {}}
    >
        监控状态
        </Modal>
}

 