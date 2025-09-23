import styled from 'styled-components'

export function CardProductoSelect({ text1, text2 }) {
	return (
		<Container>
			<span className="descripcion">{text1}</span>
			<span className="stock">{text2 && `código: ${text2}`}</span>
		</Container>
	)
}

const Container = styled.div`
	margin: 10px 0;
	display: flex;
	flex-direction: column;
	border: 1px dashed #54f05f;
	border-radius: 15px;
	background-color: rgba(84, 240, 79, 0.1);
	padding: 10px;
	.descripcion {
		color: #1fee61;
		font-weight: 700;
	}
	.stock {
		color: ${({ theme }) => theme.text};
	}
`
