import * as React from "react";
import { Modal } from "antd";

export default function(props) {
	const { modalName, visible } = props;
    
    const handleOk = () => {

    }

    const handleCancel = () => {

    }

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
