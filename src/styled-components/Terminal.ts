import styled from 'styled-components';

export const YhTerminal = styled['div']`
  	display: flex;
	background: #000;
	margin-top: 20px;
	color: #fff;
	height: ${p => p.height || 700}px;
	border: 1px solid #fff;
	overflow-y: scroll;
	div {
		height: 100%;
		width: 100%;
		padding: 5px 10px;
		pre {
			margin-top: 20px;
			display: 'inline-block';
			overflow: hidden;
			p {
				overflow: hidden;
				display: 'inline-block';
			}
			.log-title {
				::after {
					content: '    *****************************************************************************************************************************'
				}
			}
		}

	}
`