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

export const YHSmallFormItemWide = styled(Form.Item)`
	.ant-form-item-control {
		margin-right: 10px;
		width: 200px!important;
	}
	input {
		width: 200px;
	}
`
export const YHSmallFormItemNarrow = styled(Form.Item)`
	.ant-form-item-control {
		margin-right: 10px;
		width: 100px!important;
	}
	input {
		width: 100px;
	}
`

export const YHFlexDiv = styled('div')`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
`

export const YHFlexDivEvenly = styled('div')`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
`

export const YHFlexCenterDiv = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const YHFlexSpaceBetwenDiv = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const YHFlexSpaceAroundDiv = styled('div')`
  display: flex;
  justify-content: space-around;
  align-items: center;
`