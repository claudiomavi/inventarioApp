import styled from 'styled-components'
import {
	Buscador,
	ContentFiltro,
	Header,
	Title,
	v as _v,
	Btnsave,
	Tabs,
	RegistrarKardex,
	useKardexStore,
} from '../../autoBarrell'
import { useState } from 'react'

export function KardexTemplate({ data }) {
	const [state, setState] = useState(false)
	const [openRegistro, setOpenRegistro] = useState(false)
	const [tipo, setTipo] = useState('')

	const { setBuscador } = useKardexStore()

	const nuevaEntrada = () => {
		setOpenRegistro(true)
		setTipo('entrada')
	}

	const nuevaSalida = () => {
		setOpenRegistro(true)
		setTipo('salida')
	}

	return (
		<Container>
			{openRegistro && (
				<RegistrarKardex
					onClose={() => setOpenRegistro(!openRegistro)}
					tipo={tipo}
				/>
			)}

			<header className="header">
				<Header
					stateConfig={{ state: state, setState: () => setState(!state) }}
				/>
			</header>
			<section className="area1">
				<ContentFiltro>
					<Title>Kardex</Title>
					<Btnsave
						bgcolor="#52de65"
						titulo="+ Entrada"
						funcion={nuevaEntrada}
					/>
					<Btnsave
						bgcolor="#fb6661"
						titulo="- Salida"
						funcion={nuevaSalida}
					/>
				</ContentFiltro>
			</section>
			<section className="area2">
				<Buscador setBuscador={setBuscador} />
			</section>
			<section className="main">
				<Tabs data={data} />
			</section>
		</Container>
	)
}

const Container = styled.div`
	min-height: 100vh;
	width: 100%;
	background-color: ${({ theme }) => theme.bgtotal};
	color: ${({ theme }) => theme.text};
	display: grid;
	padding: 15px;
	grid-template:
		'header' 100px
		'area1' 100px
		'area2' 100px
		'main' auto;
	.header {
		grid-area: header;
		/* background-color: blue; */
		display: flex;
		align-items: center;
	}
	.area1 {
		grid-area: area1;
		/* background-color: red; */
		display: flex;
		align-items: center;
	}
	.area2 {
		grid-area: area2;
		/* background-color: green; */
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.main {
		grid-area: main;
		/* background-color: purple; */
	}
`
