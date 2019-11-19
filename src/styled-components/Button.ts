
import styled from 'styled-components';

import {
	Button
} from "antd"

export const YhOp = styled['span']`
	padding-left: 2px;
	cursor: ${p => p.default ? 'default' : 'pointer'};
	padding-right: 5px;
	i,span {
		font-size: ${p => p.fontSize? p.fontSize : 12}px;
	}
	&:hover {
		color: #0070cc;
	}
`

export const YhAdd = styled(Button)`
	margin-bottom: 10px;
`

export const YhId = styled['span']`
padding-left: 2px;
	cursor: ${p => p.default ? 'default' : 'pointer'};
	color:  #0070cc;
	font-weight: 500;
`