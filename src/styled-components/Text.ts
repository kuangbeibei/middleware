import styled from "styled-components";

export interface IYhText {
	type?: string;
	width?: number;
	height?: number;
	align?: string;
}

export const YhText = styled["span"]`
	color: ${p => {
		if (p.type === "success") {
			return "#237804";
		} else if (p.type === "fail") {
			return "#c41d7f";
		} else if (p.type === "warning") {
			return "#fa8c16";
		} else if (p.type === "info") {
			return "#bfbfbf";
		} else if (p.type === "ready") {
			return "#52c41a";
		} else if (p.type === "fatal") {
			return "red"
		} else {
			return "#0070cc"
		}
	}};
	width: ${p => (p.width ? p.width : 50)}px;
	height: ${p => (p.height ? p.height : 30)}px;
	text-align: ${p => {
		if (p.align === "center") {
			return "center";
		} else {
			return "left";
		}
	}};
`;
