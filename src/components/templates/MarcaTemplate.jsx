import styled from 'styled-components'
import {
	Btnfiltro,
	ContentFiltro,
	Header,
	RegistrarMarca,
	TablaMarca,
	Title,
} from '../../autoBarrell'
import { useState } from 'react'
import { v } from '../../styles/variables'

export function MarcaTemplate({ data }) {
	const [state, setState] = useState(false)
	const [dataSelect, setDataSelect] = useState([])
	const [accion, setAccion] = useState('')
	const [openRegistro, setOpenRegistro] = useState(false)

	return (
		<Container>
			{openRegistro && (
				<RegistrarMarca
					onClose={() => setOpenRegistro(!openRegistro)}
					dataSelect={dataSelect}
					accion={accion}
				/>
			)}

			<header className="header">
				<Header
					stateConfig={{ state: state, setState: () => setState(!state) }}
				/>
			</header>
			<section className="area1">
				<ContentFiltro>
					<Title>Marcas</Title>
					<Btnfiltro
						bgcolor="#f6f3f3"
						textcolor="#353535"
						icono={<v.agregar />}
					/>
				</ContentFiltro>
			</section>
			<section className="area2"></section>
			<section className="main">
				<TablaMarca data={data} />
			</section>
		</Container>
	)
}

const Container = styled.div`
	height: 100vh;
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
		background-color: blue;
		display: flex;
		align-items: center;
	}
	.area1 {
		grid-area: area1;
		background-color: red;
		display: flex;
		align-items: center;
	}
	.area2 {
		grid-area: area2;
		background-color: green;
		display: flex;
		align-items: center;
	}
	.main {
		grid-area: main;
		background-color: purple;
	}
`
