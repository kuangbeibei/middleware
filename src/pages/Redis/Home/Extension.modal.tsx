/*
 * 扩容弹窗
 * @Author: kuangdan 
 * @Date: 2019-11-18 14:15:44 
 * @Last Modified: 2019-11-18 14:15:44 
 */

import * as React from "react"
import Modal from "@com/Modal";

export default function (props) {
    return <Modal
			modalName={`Redis集群扩容`}
			visible={false}
			handleOk={() => {}}
			handleCancel={() => {}}
    >
        扩容弹窗
        </Modal>
}

 