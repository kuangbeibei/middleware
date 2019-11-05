import * as React from "react";
import { Modal } from "antd";

export default function(props) {
	const { modalName } = props;

    return <Modal title={modalName}>
        {
            props.children
        }
    </Modal>;
}
