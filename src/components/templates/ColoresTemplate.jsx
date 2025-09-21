import styled from 'styled-components'
import {
	Btnfiltro,
	Buscador,
	ContentFiltro,
	Header,
	RegistrarColores,
	TablaColores,
	Title,
	useColoresStore,
	v as _v,
} from '../../autoBarrell'
import { useState } from 'react'

export function ColoresTemplate({ data }) {
	const [state, setState] = useState(false)
	const [dataSelect, setDataSelect] = useState([])
	const [accion, setAccion] = useState('')
	const [openRegistro, setOpenRegistro] = useState(false)

	const { setBuscador } = useColoresStore()

	const nuevoRegistro = () => {
		setOpenRegistro(!openRegistro)
		setAccion('Nuevo')
		setDataSelect([])
	}

	return (
		<Container>
			{openRegistro && (
				<RegistrarColores
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
					<Title>Colores</Title>
					<Btnfiltro
						bgcolor="#f6f3f3"
						textcolor="#353535"
						icono={<_v.agregar />}
						funcion={nuevoRegistro}
					/>
				</ContentFiltro>
			</section>
			<section className="area2">
				<Buscador setBuscador={setBuscador} />
			</section>
			<section className="main">
				<TablaColores
					data={data}
					setOpenRegistro={setOpenRegistro}
					setDataSelect={setDataSelect}
					setAccion={setAccion}
				/>
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
