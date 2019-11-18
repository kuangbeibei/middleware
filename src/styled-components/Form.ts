import styled from 'styled-components';
import { Form } from "antd"

export const YHSmallFormItem = styled(Form.Item)`
	.ant-form-item-control {
		margin-right: 10px;
		width: 150px!important;
	}
	input {
		width: 150px;
	}
`

export const YHFlexDiv = styled('div')`
	display: flex;
	justify-content: space-between;
	align-items: center;
`