/*
 * 配置详情弹窗
 * @Author: kuangdan 
 * @Date: 2019-11-18 14:18:39 
 * @Last Modified: 2019-11-18 14:18:39 
 */ 

 import * as React from "react"
import Modal from "@com/Modal";

export default function (props) {
    return <Modal
			modalName={`配置详情`}
			visible={false}
			handleOk={() => {}}
			handleCancel={() => {}}
    >
        配置详情
        </Modal>
}
