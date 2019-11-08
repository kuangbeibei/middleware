import * as React from 'react';

import styled from 'styled-components';

import {
	Button
} from "antd"


export interface IYhOp {
	color?: string
	fontSize: string,
  	default?: boolean
}
export const YhOp = styled['span']`
	padding-left: 5px;
  	color: ${p => p.color || '#0070cc'};
	cursor: ${p => p.default ? 'default' : 'pointer'};
	padding-right: 5px;
	i,span {
		font-size: ${p => p.fontSize? p.fontSize : 12}px;
	}
`

export const YhAdd = styled(Button)`
	margin-bottom: 10px;
`