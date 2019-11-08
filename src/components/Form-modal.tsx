import * as React from "react";
import {
	useState,
	useEffect
} from "react"

import { Modal } from "antd";

export default function(props) {
	const { modalName, visible, handleOk, handleCancel } = props;
	
	return (
		<Modal
			title={modalName}
            visible={visible}
            onOk={handleOk}
			onCancel={handleCancel}
			maskClosable={false}
		>
			{props.children}
		</Modal>
	);
}
