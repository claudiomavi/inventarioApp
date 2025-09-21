import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'

export function Buscador({ setBuscador, funcion }) {
	const buscar = (e) => {
		setBuscador(e.target.value)
	}

	const ejecutarFuncion = () => {
		if (funcion) funcion()
	}

	return (
		<Container onClick={ejecutarFuncion}>
			<article className="content">
				<FaSearch className="icon" />
				<input
					onChange={buscar}
					placeholder="...buscar"
				></input>
			</article>
		</Container>
	)
}

const Container = styled.div`
	background-color: ${({ theme }) => theme.bg};
	border-radius: 10px;
	height: 60px;
	align-items: center;
	display: flex;
	color: ${({ theme }) => theme.text};
	border: 1px solid #414244;
	.content {
		padding: 15px;
		display: flex;
		gap: 10px;
		align-items: center;
		position: relative;
		width: 100%;
		.icon {
			font-size: 18px;
		}
		input {
			font-size: 18px;
			width: 100%;
			outline: none;
			background: none;
			border: 0;
			color: ${({ theme }) => theme.text};
		}
	}
`
