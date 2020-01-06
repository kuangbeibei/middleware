import styled from "styled-components";

import * as React from "react";

export const LogLineWrapper = styled(`div`)`
	display: flex;
	&:hover {
		background: #444 !important;
	}
	padding-top: 4px;
	padding-bottom: 4px;
	cursor: default;
	align-items: center;
`;

export const LogLineNumber = styled(`span`)`
	font-size: 12px;
	color: #666;
	display: inline-block;
	width: 27px;
	flex-shrink: 0;
	flex-grow: 0;
	text-align: right;
	margin-right: 14px;
`;

export const LogLineContent = styled(`span`)`
	display: inline-block;
	width: auto;
	height: auto;
`;
