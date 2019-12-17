/*
 * Mysql 集群的创建和修改
 * @Date: 2019-12-16 17:17:22 
 * @Last Modified: 2019-12-16 17:17:22 
 */ 

import * as React from "react";
import {
    useState,
    useEffect
} from "react";

import {
	Button,
	Divider,
	Form,
	Input,
	message,
	Select,
	Icon,
	Row,
	Col
} from "antd";

import Modal from "@com/Modal";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";

import {
    IPostParams
} from "./data"

// const initIPostParams: IPostParams = {
	
// };

function FormModal(props) {

    const {
		tableModalVisibility,
		setTableModalVisibility,
		form: { getFieldDecorator },
		taskId,
		detail,
		tenantRes
	} = props;
	
	useEffect(() => {
		setTableModalVisibility();
	}, []);	
    
    const handleOk = () => {

    }

    const handleCancel = () => {
		setTableModalVisibility();
    }

    return (
		<Modal
			modalName={`创建Mysql集群`}
			visible={tableModalVisibility.visible}
			handleOk={handleOk}
			handleCancel={handleCancel}
			width={"60%"}
		>
			<Form>
				<Divider>基础信息</Divider>
				
			</Form>
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
)(Form.create({})(FormModal));
