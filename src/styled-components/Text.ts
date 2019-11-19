import styled from 'styled-components';

export interface IYhText {
	type?: string,
	width?: number,
	height?: number,
	align?: string,
}

export const YhText = styled['span']`
	color: ${(p) => {
		if(p.type === 'success'){
			return '#52c41a'
		}else if(p.type === 'fail'){
			return '#f5222d'
		}else if(p.type === 'warning'){
			return '#faad14'
		}else if(p.type === 'info'){
			return '#666'
		}
	}};
	width: ${(p) => p.width ? p.width : 50}px;
	height: ${(p) => p.height ? p.height : 30}px;
	text-align: ${(p) => {
		if(p.align === 'center'){
			return 'center';
		}else {
			return 'left';
		}
	}}
`